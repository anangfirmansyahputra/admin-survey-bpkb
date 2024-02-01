import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

const pageSize = 10;

export async function POST(request: Request, res: Response) {
  try {
    let hasNext = false;
    const { page } = await request.json();
    const { count } = await supabase
      .from("pelanggan")
      .select("*", { count: "exact", head: true });

    const { data, error: err } = await supabase
      .from("pelanggan")
      .select("*")
      .order("created_at", { ascending: false })
      .range(page * pageSize, (page + 1) * pageSize - 1);

    // @ts-ignore
    const totalDataNow = pageSize * page + data?.length;

    // @ts-ignore
    if (totalDataNow < count) {
      hasNext = true;
    }
    return NextResponse.json(
      { message: "Get Data Success", data, hasNext },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
