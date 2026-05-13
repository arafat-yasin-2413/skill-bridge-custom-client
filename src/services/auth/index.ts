"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const logoutUser = async()=>{
    const storedCookie = await cookies();
    storedCookie.delete("token")
}

export const getUser = async()=>{
    const storedCookie = await cookies();
    const token = storedCookie.get("token")?.value;

    // console.log("Token in frontend getUser Service ======= : ", token);

    let decodedData = null;

    if(token) {
        decodedData = await jwtDecode(token);
        // console.log("Decoded data in get user service : ", decodedData);
        return decodedData;
    }
    else {
        return null;
    }
};