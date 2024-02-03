import { Metadata } from "next";
import FormLayout from "./components/form";
export const metadata: Metadata = {
  title: "Form Layout Page | Next.js E-commerce Dashboard Template",
  description: "This is Form Layout page for TailAdmin Next.js",
};

export default function Page() {
  return <FormLayout />;
}
