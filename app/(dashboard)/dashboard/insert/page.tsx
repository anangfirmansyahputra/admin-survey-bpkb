import { Metadata } from "next";
import FormLayout from "./components/form";
export const metadata: Metadata = {
  title: "Tambah Data",
  description: "This is Form Layout page for TailAdmin Next.js",
};

export default function Page() {
  return <FormLayout />;
}
