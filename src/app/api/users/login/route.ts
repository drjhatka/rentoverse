import { connectToDB } from "@/db/connectDB";
import { UserModel } from "@/models/userModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as jwt from 'jsonwebtoken'

connectToDB()

export async function POST(request: NextRequest) {
    try {
       //destructure request body to get input data
        const reqBody = await request.json()
        const { email, password } = reqBody;
       
        //check if user exists
        const user = await UserModel.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 })
        }
        //console.log("user exists");


        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 })
        }
        console.log(user);

        //create token data
        const tokenData = {
            id: user._id,
            username: user.firstName + user.lastName,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,

        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}