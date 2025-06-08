import { verifyToken } from "../utils/tokenHelper.js";
import { AppError } from "./errorMiddleware.js";
export async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError("Authentication invalid: No token provided or malformed header", 401);
        }
        const token = authHeader.split(" ")[1];
        const decoded = (await verifyToken(token));
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=authMiddleware.js.map