export const getUserService = (userModel) => () => {
    try {
        return userModel.getUsers();
    }
    catch (error) {
        throw new Error(error.message);
    }
};
export const getUserByStudentIdService = (userModel) => async (student_id) => {
    try {
        const user = await userModel.getUserByStudentId(student_id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
//# sourceMappingURL=userServices.js.map