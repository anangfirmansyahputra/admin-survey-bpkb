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

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // Ingat, bulan dimulai dari 0
const day = today.getDate();

const todayString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

const fetchDataForToday = async () => {
  const { data, error } = await supabase
    .from("pelanggan")
    .select("*")
    .gte("created_at", todayString + "T00:00:00.000Z")
    .lt("created_at", todayString + "T23:59:59.999Z");

  // Handle error if needed

  // Data pelanggan yang dibuat hari ini
  console.log(data);
};


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

  await fetchDataForToday();

  return (
    <>
      <ECommerce lastData={lastData || []} totalSangatPuas={totalSangatPuas} totalPuas={totalPuas} totalCukup={totalCukup} totalTidakPuas={totalTidakPuas} />
    </>
  );
}
