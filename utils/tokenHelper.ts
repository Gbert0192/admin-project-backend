import jwt from "jsonwebtoken";

interface TokenPayload {
  user_name: string;
  uuid: string;
  student_id: string;
}

interface DecodedToken extends TokenPayload {
  student_id: string;
  name: string;
  role_id: number;
  uuid: string;
  iat?: number;
  exp?: number;
}

export async function generateToken(payload: TokenPayload) {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });
    return token;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;
    return decoded;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
