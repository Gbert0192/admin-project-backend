import jwt from "jsonwebtoken";

export async function generateToken(payload) {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "5s",
    });
    return token;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error(error.message);
  }
}
