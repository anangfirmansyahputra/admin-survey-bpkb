import { formatDatetime } from "@/utils/dateFormat";
import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

const pageSize = 10;
function addOneDay(date: string) {
  const d = new Date(date);
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export async function POST(request: Request, res: Response) {
  try {
    let hasNext = false;
    const { page, desc, start, to } = await request.json();

    if (start && to) {
      const startDateTime = formatDatetime(start);
      const endDatetime = addOneDay(formatDatetime(to));
      const { count } = await supabase
        .from("pelanggan")
        .select("*", { count: "exact", head: true })
        .gte("created_at", startDateTime)
        .lte("created_at", endDatetime);

      const { data, error: err } = await supabase
        .from("pelanggan")
        .select("*")
        .gte("created_at", startDateTime)
        .lte("created_at", endDatetime)
        .order("created_at", { ascending: desc })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      // @ts-ignore
      const totalDataNow = pageSize * page + data?.length;

      // @ts-ignore
      if (totalDataNow < count) {
        hasNext = true;
      }
      return NextResponse.json(
        {
          message: "Get Data Success",
          data,
          hasNext,
          // @ts-ignore
          totalPage: Math.ceil(count / pageSize),
          totalData: count,
        },
        { status: 200 }
      );
    } else {
      const { count } = await supabase
        .from("pelanggan")
        .select("*", { count: "exact", head: true });
      const { data, error: err } = await supabase
        .from("pelanggan")
        .select("*")
        .order("created_at", { ascending: desc })
        .range(page * pageSize, (page + 1) * pageSize - 1);

      // @ts-ignore
      const totalDataNow = pageSize * page + data?.length;

      // @ts-ignore
      if (totalDataNow < count) {
        hasNext = true;
      }
      return NextResponse.json(
        {
          message: "Get Data Success",
          data,
          hasNext,
          // @ts-ignore
          totalPage: Math.ceil(count / pageSize),
          totalData: count,
        },
        { status: 200 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
