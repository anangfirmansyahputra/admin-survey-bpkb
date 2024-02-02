import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";
import { supabase } from "@/utils/supabase";

export const revalidate = 1;

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tables Page | Next.js E-commerce Dashboard Template",
  description: "This is Tables page for TailAdmin Next.js",
  // other metadata
};

const TablesPage = async () => {
  // const { data, error } = await supabase
  //   .from("users")
  //   .select()
  //   .order("created_at", { ascending: false });

  // const {
  //   data: test,
  //   error: err,
  //   count,
  // } = await supabase
  //   .from("users")
  //   .select("*", { count: "exact", head: true });

  // console.log({ count });

  return (
    <>
      <Breadcrumb pageName="Daftar Penilaian" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <TableTwo />
      </div>
    </>
  );
};

export default TablesPage;
