import { Metadata } from "next";
import FormLayout from "./components/form";

export const revalidate = 1;

export const metadata: Metadata = {
  title: "Edit Data",
  description: "This is Form Layout page for TailAdmin Next.js",
};

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <FormLayout id={params.id} />;
}
