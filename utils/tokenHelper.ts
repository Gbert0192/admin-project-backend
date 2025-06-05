import jwt from "jsonwebtoken";

interface TokenPayload {
  user_name: string;
  user_id: string;
  student_id: string;
  user_uuid: string;
}

interface DecodedToken extends TokenPayload {
  student_id: string;
  name: string;
  role_id: number;
  iat?: number;
  exp?: number;
}

export async function generateToken(payload: TokenPayload) {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "5s",
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
