import { getSession, updateSession } from "@/lib/session";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};

const shouldRedirect = (url: string) => {
  const unprotectedRoutes = ["/login", "/register"];
  let flag = true;
  for (let i = 0; i < unprotectedRoutes.length; i++) {
    if (new URL(url).pathname === unprotectedRoutes[i]) {
      flag = false;
      break;
    }
  }
  return flag;
};

export async function middleware(request: NextRequest) {
  const tokenPayload = await getSession(request);
  console.log("coming to here....")
  if (tokenPayload) {
    return updateSession(request);
  }

  if (!tokenPayload && shouldRedirect(request.url)) {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}