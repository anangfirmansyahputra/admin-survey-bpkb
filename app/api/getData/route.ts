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
    const { start, to } = await request.json();

    const startDateTime = formatDatetime(start);
    const endDatetime = addOneDay(formatDatetime(to));

    const { data, error: err } = await supabase
      .from(process.env.TABLES_SECRET || "")
      .select("*")
      .order("created_at", { ascending: true })
      .gte("created_at", startDateTime)
      .lte("created_at", endDatetime);

    return NextResponse.json(
      { message: "Get Data Success", data },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
