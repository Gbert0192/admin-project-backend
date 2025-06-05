import { verifyToken } from "../utils/tokenHelper.js";
export async function authMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new Error("Unauthorized");
        }
        const decoded = (await verifyToken(token));
        if (!decoded) {
            throw new Error("Token Not Valid");
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
}
//# sourceMappingURL=authMiddleware.js.map