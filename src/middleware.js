import { NextResponse } from "next/server";

export function middleware (request){
const token = request.cookies.get("tokenUser")
console.log(token)
if(!token){
    return NextResponse.redirect(
        new URL('/',request.url)

    )
}
return NextResponse.next()
}
export const config={
    matcher: ["/Profile",
        "/AddProduct",
        "/Products/Update/:path*",
        "/Products/Delete/:path*",
        "/Products/Upload/:path*",
        "/Categories/Update/:path*",
        "/AddCateogories"
        
    ]

}