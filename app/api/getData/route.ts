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

    function formatTimestampToWIB(timestamp) {
      // Buat objek Date dari timestamp
      const date = new Date(timestamp);

      // Ubah ke zona waktu WIB (UTC+7)
      date.setHours(date.getHours() + 7);

      // Format tanggal dan waktu menggunakan Intl.DateTimeFormat
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZoneName: "short",
        timeZone: "Asia/Jakarta", // Zona waktu WIB
      };

      const formatter = new Intl.DateTimeFormat("id-ID", options);
      const formattedDate = formatter.format(date);

      return formattedDate;
    }

    const timestamp = "2024-01-31T13:03:55.10399+00:00";
    const formattedWIB = formatTimestampToWIB(timestamp);
    console.log(formattedWIB);

    const { data, error: err } = await supabase
      .from("pelanggan")
      .select("*")
      // .order("created_at", { ascending: false });
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
