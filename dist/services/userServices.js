export const getUserService = (userModel) => () => {
    try {
        return userModel.getUsers();
    }
    catch (error) {
        throw new Error(error.message);
    }
};
export const getUserByStudentIdService = (userModel) => (student_id) => {
    try {
        return userModel.getUserByStudentId(student_id);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
//# sourceMappingURL=userServices.js.map