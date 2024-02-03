import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";
export const revalidate = 1;

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Penilaian",
  description: "This is Tables page for TailAdmin Next.js",
};

const TablesPage = async () => {
  return (
    <>
      <Breadcrumb pageName="Daftar Penilaian" />

      <div className="flex flex-col gap-10">
        <TableTwo />
      </div>
    </>
  );
};

export default TablesPage;
