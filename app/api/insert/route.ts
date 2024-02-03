import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request, res: Response) {
  try {
    const { kepuasan, created_at } = await request.json();

    const { error } = await supabase
      .from(process.env.TABLES_SECRET || "")
      .insert({ kepuasan, created_at });

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
