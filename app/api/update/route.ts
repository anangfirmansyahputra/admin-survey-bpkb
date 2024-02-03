import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request, res: Response) {
  try {
    const { id, ...body } = await request.json();

    const { error } = await supabase
      .from(process.env.TABLES_SECRET || "")
      .update(body)
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { message: "Gagal", success: false },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { message: "Berhasil", success: true },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
