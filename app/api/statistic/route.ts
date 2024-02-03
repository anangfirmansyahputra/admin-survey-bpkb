import { formatDatetime } from "@/utils/dateFormat";
import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

function addOneDay(date: string) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

const fetchData = async (
  startDateTime: string,
  endDatetime: string,
  kepuasan: string
) => {
  const {
    data,
    error: err,
    count,
  } = await supabase
    .from(process.env.TABLES_SECRET || "")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("kepuasan", kepuasan)
    // .order("created_at", { ascending: false });
    .gte("created_at", startDateTime)
    .lte("created_at", endDatetime);

  return count;
};

export async function POST(request: Request, res: Response) {
  try {
    const { start, to } = await request.json();

    const totalCukup = await fetchData(start, to, "1");
    const totalPuas = await fetchData(start, to, "2");
    const totalSangatPuas = await fetchData(start, to, "3");
    const totalTidakPuas = await fetchData(start, to, "0");

    return NextResponse.json(
      {
        message: "Get Data Success",
        totalCukup,
        totalPuas,
        totalSangatPuas,
        totalTidakPuas,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
