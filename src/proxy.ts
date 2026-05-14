import { NextRequest, NextResponse } from "next/server";
import { authRoutes, DEFAULT_LOGIN_REDIRECT, privateRoutes } from "./lib/routes";

export function proxy(request:NextRequest){
    const {pathname} = request.nextUrl;
    // console.log("Printing Request : ", request);
    // console.log("======== Request.nextUrl========", request.nextUrl);


    const token = request.cookies.get("token")?.value;
    // console.log("&&&&&&&&&& TOKEN : ", token);

    const isLoggedIn = !!token;

    const isPrivateRoute = privateRoutes.some((route)=>
    pathname.startsWith(route));

    const isAuthRoute = authRoutes.includes(pathname);

    // 1. Login na kore private route access korte chaile login a pathabe
    if(!isLoggedIn && isPrivateRoute) {
        const loginUrl = new URL("/login", request.url);

        // desired route saving
        loginUrl.searchParams.set("callbackUrl", pathname);

        return NextResponse.redirect(loginUrl);
    }

    // 2. Login kora thakle authRoute a dhukte dibena
    if(isLoggedIn && isAuthRoute) {
        return NextResponse.redirect(
            new URL(DEFAULT_LOGIN_REDIRECT, request.url)
        );
    }

    return NextResponse.next();


}


export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};