import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get auth token from cookies
  const authToken = request.cookies.get("auth_token")?.value;
  const authUser = request.cookies.get("auth_user")?.value;

  // Check if user is trying to access protected routes
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/create-post") ||
    request.nextUrl.pathname.startsWith("/posts/edit");

  if (isProtectedRoute) {
    // If no auth token or user data, redirect to login
    if (!authToken || !authUser) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Parse user data from cookie
      const user = JSON.parse(authUser);

      // Basic validation - check if user has required fields
      if (!user.id || !user.username) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
      }

      // Continue with the request if authenticated
      return NextResponse.next();
    } catch (error) {
      // If user data is invalid JSON, redirect to login
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // For non-protected routes, continue normally
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/create-post/:path*", "/posts/edit/:path*"],
};
