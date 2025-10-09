"use server";
import { verifyToken } from "../functions/jwt";

const JWT_SECRET = process.env.JWT || "your_jwt_secret"; // Set in your env

export const ValidateToken = async(the_token) => {
    try {
       const verify_outcome = verifyToken(the_token);
         if(verify_outcome){
            return true;
         } else {
            return false;
         }
    } catch (error) {
         console.error('Token validation error:', error);
            return false;
    }
}