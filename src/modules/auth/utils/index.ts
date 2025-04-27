import { cookies as getCookies } from "next/headers";

interface generateAuthCookieProps {
    prefix: string;
    value: string;
};

export const generateAuthCookie = async ({ prefix, value }: generateAuthCookieProps) => {
  const cookies = await getCookies();
  cookies.set({
    name: `${prefix}-token`,
    value: value,
    httpOnly: true,
    path: "/"
  });
};
