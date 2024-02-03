// import { supabase } from "@/utils/supabase";
// import { NextResponse } from "next/server";

// function addOneDay(date: string) {
//   const d = new Date(date);
//   d.setDate(d.getDate() + 1);
//   return d.toISOString().split("T")[0];
// }

// export async function POST(request: Request, res: Response) {
//   try {
//     const { kepuasan, created_at } = await request.json();

//     if (!kepuasan || !created_at) {

//     }

//     const { data, error: err } = await supabase
//       .from(process.env.TABLES_SECRET || "")
//       .insert()

//     return NextResponse.json(
//       { message: "Get Data Success", data },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: "Internal Error" }, { status: 500 });
//   }
// }
