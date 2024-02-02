// @ts-nocheck
import { parse, serialize } from "cookie";

export const setCookie = (res, name, value, options = {}) => {
  const cookie = serialize(name, value, options);
  res.setHeader("Set-Cookie", cookie);
};

export const parseCookies = (req) => {
  return parse(req.headers.cookie || "");
};
