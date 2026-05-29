import { WorkflowSlug, CurrentStatus, NationalityGroup } from "@prisma/client";

export interface RoadmapRecommendation {
  slug: WorkflowSlug;
  order: number;
  reason: string;
  isUrgent: boolean;
  isApplicable: boolean;
}

export interface RoadmapInput {
  nationalityGroup: NationalityGroup;
  currentStatus: CurrentStatus;
  arrivalDate: Date | null;
  moveInDate: Date | null;
  visaExpiryDate: Date | null;
  hasGermanBank: boolean;
  hasGermanSIM: boolean;
}

/**
 * Deterministically generates a sequenced roadmap based on user profile inputs.
 */
export function generateRoadmap(input: RoadmapInput): RoadmapRecommendation[] {
  const {
    nationalityGroup,
    currentStatus,
    arrivalDate,
    moveInDate,
    visaExpiryDate,
    hasGermanBank,
    hasGermanSIM,
  } = input;

  // Initial base order
  const orderList: WorkflowSlug[] = [];

  // Check if moving within Germany or already settled (i.e. already has bank & SIM)
  const isAlreadySettled = hasGermanBank && hasGermanSIM;

  // Decide sequence based on profile inputs
  if (isAlreadySettled) {
    // If already settled, Anmeldung is typically the priority (e.g. registration of new address), then Tax ID update.
    orderList.push(
      "anmeldung",
      "tax_id_elster",
      "residence_permit",
      "health_insurance",
      "banking",
      "mobile_sim"
    );
  } else if (currentStatus === "student") {
    // Students need health insurance proof for enrollment, and SIM for local phone/internet, before banking setup.
    orderList.push(
      "mobile_sim",
      "health_insurance",
      "banking",
      "anmeldung",
      "residence_permit",
      "tax_id_elster"
    );
  } else if (
    currentStatus === "employee" ||
    currentStatus === "skilled_worker" ||
    currentStatus === "blue_card_candidate"
  ) {
    // Employees need banking first for salary, then health insurance and Anmeldung to get their Tax ID for tax class setups.
    orderList.push(
      "banking",
      "health_insurance",
      "anmeldung",
      "tax_id_elster",
      "residence_permit",
      "mobile_sim"
    );
  } else {
    // Default flow
    orderList.push(
      "mobile_sim",
      "banking",
      "health_insurance",
      "anmeldung",
      "residence_permit",
      "tax_id_elster"
    );
  }

  // Generate recommendations with reasons and urgency checks
  const recommendations: RoadmapRecommendation[] = orderList.map((slug, index) => {
    let order = index + 1;
    let reason = "Recommended step in your setup sequence.";
    let isUrgent = false;
    let isApplicable = true;

    // 1. Check if residence permit is applicable (not applicable for EU/EEA nationals)
    if (slug === "residence_permit" && nationalityGroup === "eu_eea") {
      isApplicable = false;
      reason = "As an EU/EEA citizen, you have freedom of movement and do not require a residence permit.";
    }

    // 2. Custom reasons and urgency mapping
    switch (slug) {
      case "mobile_sim":
        if (hasGermanSIM) {
          reason = "You already have a German mobile SIM card.";
        } else if (currentStatus === "student") {
          reason = "Get a local SIM early. You will need a German phone number for bank verification and mobile internet.";
        } else {
          reason = "Setting up a local SIM early helps with appointment verifications and communication in Germany.";
        }
        break;

      case "banking":
        if (hasGermanBank) {
          reason = "You already have a German bank account.";
        } else if (currentStatus === "student") {
          reason = "Essential to pay for housing deposit, health insurance premiums, and blocked account payouts.";
        } else if (
          currentStatus === "employee" ||
          currentStatus === "skilled_worker" ||
          currentStatus === "blue_card_candidate"
        ) {
          reason = "Your employer requires a SEPA bank account to pay your salary. Set this up as soon as possible.";
          isUrgent = true;
        } else {
          reason = "Essential for renting an apartment, paying utility bills, and signing local contracts.";
        }
        break;

      case "health_insurance":
        if (currentStatus === "student") {
          reason = "You must present proof of German health insurance to complete university enrollment.";
          isUrgent = true;
        } else if (
          currentStatus === "employee" ||
          currentStatus === "skilled_worker" ||
          currentStatus === "blue_card_candidate"
        ) {
          reason = "German public health insurance is mandatory for employment. Your employer needs this details to register you.";
          isUrgent = true;
        } else {
          reason = "German law requires everyone residing in Germany to have valid health insurance.";
        }
        break;

      case "anmeldung":
        const now = new Date();
        const daysToMoveIn = moveInDate
          ? Math.ceil((new Date(moveInDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          : null;

        if (daysToMoveIn !== null && daysToMoveIn <= 14 && daysToMoveIn >= -14) {
          reason = "By law, you must register your address within 14 days of moving in. Book your Bürgeramt appointment now.";
          isUrgent = true;
        } else {
          reason = "Address registration (Anmeldung) is required to obtain your Tax ID and complete other official procedures.";
        }
        break;

      case "residence_permit":
        if (isApplicable) {
          if (visaExpiryDate) {
            const expiryDays = Math.ceil(
              (new Date(visaExpiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
            );
            if (expiryDays <= 90) {
              reason = `Your visa expires on ${new Date(visaExpiryDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}. You must book a residence permit appointment immediately.`;
              isUrgent = true;
            } else {
              reason = "Convert your entry visa into a residence permit before it expires. Appointment booking queues are often long.";
            }
          } else if (nationalityGroup === "non_eu") {
            reason = "Non-EU citizens staying longer than 90 days (or their entry visa duration) must apply for a residence permit.";
          }
        }
        break;

      case "tax_id_elster":
        if (
          currentStatus === "employee" ||
          currentStatus === "skilled_worker" ||
          currentStatus === "blue_card_candidate"
        ) {
          reason = "Your employer needs your Tax ID to deduct the correct income tax. Otherwise, you will be taxed at the highest rate (Class 6).";
        } else {
          reason = "Your tax registration number (Steueridentifikationsnummer) is mailed to you automatically after Anmeldung.";
        }
        break;
    }

    return {
      slug,
      order,
      reason,
      isUrgent,
      isApplicable,
    };
  });

  return recommendations;
}
