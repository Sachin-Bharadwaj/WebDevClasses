import { NextRequest, NextResponse } from "next/server";
import  prisma  from "../../../lib/db";



export async function POST(req: NextRequest) {
    const { username, password} = await req.json();
    
    await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    })

    return NextResponse.json({
        message: "You have been signed up successfully"
    })
}