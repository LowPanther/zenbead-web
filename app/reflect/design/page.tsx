import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReflectWriteSurface } from "../ReflectWriteSurface";

export const metadata: Metadata = {
  title: "Journal (local preview) — ZenBead",
  robots: { index: false, follow: false },
};

/**
 * Local layout/design checks only: same writing shell as a paired session, no QR step.
 * Not available in production builds (`notFound()`).
 */
export default function ReflectDesignPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="reflect reflect--writing">
      <ReflectWriteSurface sessionToken="design-preview" />
    </div>
  );
}
