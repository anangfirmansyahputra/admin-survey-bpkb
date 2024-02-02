import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Form from "./components/form";
import { supabase } from "@/utils/supabase";
export const metadata: Metadata = {
  title: "Form Layout Page | Next.js E-commerce Dashboard Template",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

const FormLayout = async () => {
  const { data, error: err } = await supabase
    .from("users")
    .select()
    .order("created_at", { ascending: false });

  return (
    <>
      <Breadcrumb pageName="Rekap Data" />
      <Form />
    </>
  );
};

export default FormLayout;
