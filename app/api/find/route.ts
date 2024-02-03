import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request, res: Response) {
  try {
    const { id } = await request.json();

    const { data, error } = await supabase
      .from(process.env.TABLES_SECRET || "")
      .select()
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { message: "Gagal", success: false, data: null },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Berhasil", success: true, data: data[0] },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
