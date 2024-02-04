import { formatDatetime } from "@/utils/dateFormat";
import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

function addOneDay(date: string) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export async function POST(request: Request, res: Response) {
  try {
    const todayStart = new Date().toISOString().split("T")[0]; // Hari ini mulai dari waktu 00:00:00
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const todayEndISOString = todayEnd.toISOString();

    const { data, error } = await supabase
      .from(process.env.TABLES_SECRET || "")
      .select()
      .gte("created_at", todayStart)
      .lt("created_at", todayEndISOString)
      .order("created_at", { ascending: false })
      .limit(5);

    return NextResponse.json(
      { message: "Get Data Success", data },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
