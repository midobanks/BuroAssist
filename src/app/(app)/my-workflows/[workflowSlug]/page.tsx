import { redirect } from "next/navigation";

export default async function OldWorkflowDetailRedirect({
  params,
}: {
  params: Promise<{ workflowSlug: string }>;
}) {
  const { workflowSlug } = await params;
  redirect(`/workflows/${workflowSlug}`);
}
