
import { supabase } from "@/utils/supabase";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js",
  // other metadata
};

const TablesPage = async () => {
  const { data, error: err } = await supabase
    .from("pelanggan")
    .select()
    .order("created_at", { ascending: false })


  return (
    <>
      <Breadcrumb pageName="Daftar Penilaian" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <TableTwo data={data || []} />
      </div>
    </>
  );
};

export default TablesPage;
