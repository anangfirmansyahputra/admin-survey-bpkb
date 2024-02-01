import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import { supabase } from "@/utils/supabase";

export const revalidate = 1

export const metadata: Metadata = {
  title: "Dashboard Survey BKPB",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

const fetchPenilaian = async (value: string) => {
  const { data, error, count } = await supabase
    .from("pelanggan")
    .select("kepuasan", { count: "exact" })
    .eq("kepuasan", value);

  return { data, error, count }
}


export default async function Home() {
  const { data: lastData, error } = await supabase
    .from("pelanggan")
    .select()
    .order("created_at", { ascending: false })
    .limit(5);

  const totalSangatPuas = await fetchPenilaian("3")
  const totalPuas = await fetchPenilaian("2")
  const totalCukup = await fetchPenilaian("1")
  const totalTidakPuas = await fetchPenilaian("0")

  return (
    <>
      <ECommerce lastData={lastData || []} totalSangatPuas={totalSangatPuas} totalPuas={totalPuas} totalCukup={totalCukup} totalTidakPuas={totalTidakPuas} />
    </>
  );
}
