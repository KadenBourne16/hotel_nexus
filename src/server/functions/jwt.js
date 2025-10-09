import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret"; // Make sure this is set

// Function to generate a JWT
export function generateToken(payload, expiration_time) {
  return jsonwebtoken.sign(payload, SECRET_KEY, { expiresIn: expiration_time });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
}