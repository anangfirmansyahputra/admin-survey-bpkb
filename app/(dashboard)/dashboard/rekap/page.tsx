import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Form from "./components/form";
import { supabase } from "@/utils/supabase";
export const metadata: Metadata = {
  title: "Rekap Data",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};

const FormLayout = async () => {
  const { data, error: err } = await supabase
    .from(process.env.TABLES_SECRET || "")
    .select()
    .order("created_at", {
      ascending: false,
    });

  return (
    <>
      <Breadcrumb pageName="Rekap Data" />
      <Form />
    </>
  );
};

export default FormLayout;
