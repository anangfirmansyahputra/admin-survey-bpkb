import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(request: Request, res: Response) {
  try {
    return new NextResponse("Logout berhasil", {
      headers: {
        "Set-cookie": serialize("OutsiteJWT", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: -1, // Masa berlaku yang sudah berlalu
          path: "/",
        }),
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
