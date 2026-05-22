import { NextResponse } from "next/server";
import { LangMiddleware } from "./langMiddleware";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;
  const onboarding = req.cookies.get("onboarding")?.value;
  const verification = req.cookies.get("verification")?.value;

  const isAdminRoute = pathname.startsWith("/en/admin");
  const isPatientRoute = pathname.startsWith("/en/patient");

  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/en/signin") ||
    pathname.startsWith("/en/signup");

  const isOnboardingRoute =
    pathname.startsWith("/en/signup-register") ||
    pathname.startsWith("/en/signup-step") ||
    pathname.startsWith("/en/signup") ||
    pathname.startsWith("/en/signin");

  // BLOCK ONLY protected routes if NOT logged in

  if (onboarding == "1") {
    if (token && isPublicRoute) {
      if (role === "admin" || role === "super_admin") {
        return NextResponse.redirect(new URL("/en/admin/dashboard", req.url));
      }
    }
  }
  if (onboarding == "0" && verification == "complete") {
    if (token && isPublicRoute) {
      if (role == "provider") {
        return NextResponse.redirect(new URL("/en/admin/dashboard", req.url));
      }
    }
  }

  if (token && isPublicRoute) {
    if (role === "patient") {
      return NextResponse.redirect(new URL("/en/patient", req.url));
    }
  }

  // FIRST: language middleware
  const isLocalized = pathname.startsWith("/en");
  if (!isLocalized) {
    const langResponse = LangMiddleware(req);
    if (langResponse) return langResponse;
  }

  if (!token) {
    if (isAdminRoute || isPatientRoute) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  if (token && onboarding === "0" && verification !== "complete") {
    const isSystemAdmin = role === "super_admin" || role === "admin";
    // System admins do not undergo standard provider onboarding verification
    if (!isSystemAdmin) {
      if (isAdminRoute || isPatientRoute) {
        return NextResponse.redirect(new URL("/en/signin", req.url));
      }

      if (!isOnboardingRoute) {
        return NextResponse.redirect(new URL("/en/signin", req.url));
      }
    }
  }

  // Logged in → restrict role access
  if (role === "patient" && isAdminRoute) {
    return NextResponse.redirect(new URL("/en/patient", req.url));
  }
  if ((role === "admin" || role === "provider" || role === "super_admin") && isPatientRoute) {
    return NextResponse.redirect(new URL("/en/admin/dashboard", req.url));
  }

  if (token && pathname === "/") {
    if (role === "patient") {
      return NextResponse.redirect(new URL("/en/patient", req.url));
    }
  }

  if (token && pathname === "/" && onboarding == "1") {
    if (role == "admin" || role === "super_admin") {
      return NextResponse.redirect(new URL("/en/admin/dashboard", req.url));
    }
  }
  if (token && pathname === "/" && onboarding == "0" && verification == "complete") {
    if (role == "admin" || role === "super_admin") {
      return NextResponse.redirect(new URL("/en/admin/dashboard", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_next/data|favicon.ico|api).*)"],
};
