


import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Domz.com | Contact",
  description:
    "Contact Domz.com regarding our curated domain marketplace. We help buyers and trusted investors connect directly and complete commission-free domain transactions.",
};

export default function Page() {
  return <ContactClient />;
}
