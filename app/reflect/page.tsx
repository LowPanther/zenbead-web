import type { Metadata } from "next";
import { ReflectSessionClient } from "./ReflectSessionClient";

export const metadata: Metadata = {
  title: "Journal — ZenBead",
  description:
    "Write your reflection in the browser: open on a computer, pair with the ZenBead app on your phone.",
  robots: { index: false, follow: false },
};

export default function ReflectPage() {
  return <ReflectSessionClient />;
}
