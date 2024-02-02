import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

const MAX_AGE = 60 * 60 * 24; // Masa berlaku 1 hari

export async function POST(request: Request, res: Response) {
  try {
    const oneDay = 24 * 60 * 60 * 1000;
    const { username, password } = await request.json();

    const secret = process.env.JWT_SECRET || "";

    if (username === "adminbpkb" && password === "poldabalisukses") {
      const token = sign(
        {
          username,
        },
        secret,
        {
          expiresIn: MAX_AGE,
        }
      );

      const serialized = serialize("OutsiteJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: MAX_AGE,
        path: "/",
      });

      const response = {
        message: "Login Berhasil",
      };

      return new Response(JSON.stringify(response), {
        headers: {
          "Set-Cookie": serialized,
        },
      });
    } else {
      return NextResponse.json(
        { message: "Username atau Password Salah" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Error" }, { status: 500 });
  }
}
