import { generateToken } from "../utils/tokenHelper.js";
import bcrypt from "bcrypt";
// interface LoginResponse {
//   user: User;
//   token: string;
//   permission: string[];
// }
// interface RegisterResponse {
//   data: {
//     data: User;
//     message: string;
//     status: number;
//   };
// }
export const loginUserService = (authModel) => async (payload) => {
    try {
        const user = await authModel.findUser(payload);
        if (!user) {
            throw new Error("User not found");
        }
        const password = payload.password;
        if (!password) {
            throw new Error("Password is required");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        const token = await generateToken({
            user_name: user.name,
            user_id: user.uuid,
            student_id: user.student_id,
            user_uuid: user.uuid,
        });
        return { user, token, permission: [] };
    }
    catch (error) {
        throw new Error(error.message);
    }
};
// export const registerUserService = async (
//   payload: RegisterSchema,
//   handleRegisterModel: (
//     payload: RegisterSchema
//   ) => Promise<RegisterResponse["data"]>
// ): Promise<RegisterResponse> => {
//   const user = await handleRegisterModel(payload);
//   return {
//     data: user,
//   };
// };
//# sourceMappingURL=authServices.js.map