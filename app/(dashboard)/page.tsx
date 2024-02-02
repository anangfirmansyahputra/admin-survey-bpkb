import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import { supabase } from "@/utils/supabase";

export const revalidate = 1;

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

  return { data, error, count };
};

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1; // Ingat, bulan dimulai dari 0
const day = today.getDate();

const todayString = `${year}-${month < 10 ? "0" + month : month}-${
  day < 10 ? "0" + day : day
}`;

const fetchDataForToday = async (value: string) => {
  const todayStart = new Date().toISOString().split("T")[0]; // Hari ini mulai dari waktu 00:00:00
  const todayEnd = new Date().toISOString(); // Hari ini hingga waktu sekarang

  const { data, error, count } = await supabase
    .from("pelanggan")
    .select("kepuasan", { count: "exact" })
    .eq("kepuasan", value)
    .gte("created_at", todayStart)
    .lt("created_at", todayEnd);

  return { data, error, count };
};

export default async function Home() {
  const todayStart = new Date().toISOString().split("T")[0]; // Hari ini mulai dari waktu 00:00:00
  const todayEnd = new Date().toISOString(); // Hari ini hingga waktu sekarang

  const { data: lastData, error } = await supabase
    .from("pelanggan")
    .select()
    .gte("created_at", todayStart)
    .lt("created_at", todayEnd)
    .order("created_at", { ascending: false })
    .limit(5);

  const totalSangatPuas = await fetchDataForToday("3");
  const totalPuas = await fetchDataForToday("2");
  const totalCukup = await fetchDataForToday("1");
  const totalTidakPuas = await fetchDataForToday("0");

  return (
    <>
      <ECommerce
        lastData={lastData || []}
        totalSangatPuas={totalSangatPuas}
        totalPuas={totalPuas}
        totalCukup={totalCukup}
        totalTidakPuas={totalTidakPuas}
      />
    </>
  );
}
