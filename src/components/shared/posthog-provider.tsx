"use client";

import posthog from "posthog-js";
import { PostHogProvider as PostHogProviderBase } from "posthog-js/react";
import { useEffect, useRef } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const initializedRef = useRef(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

    if (key && typeof window !== "undefined" && !initializedRef.current) {
      initializedRef.current = true;
      posthog.init(key, {
        api_host: host,
        person_profiles: "identified_only",
        capture_pageview: false,
        loaded: (ph) => {
          if (process.env.NODE_ENV !== "production") {
            ph.debug();
          }
        },
      });
    }
  }, []);

  return <PostHogProviderBase client={posthog}>{children}</PostHogProviderBase>;
}
