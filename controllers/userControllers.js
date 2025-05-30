import { getUserIdSchema, deleteUserSchema } from "../schemas/userSchema.js";
import {
  getAllUsers,
  getUserId,
  deletedUser,
} from "../services/userServices.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const getUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getUserIdController = async (req, res) => {
  try {
    const { id } = ValidateSchema(getUserIdSchema, req.params);
    const user = await getUserId(id);
    res.status(200).send({ data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = ValidateSchema(deleteUserSchema, req.params);
    const deletedUserData = await deletedUser(id);
    res.status(200).send({ data: deletedUserData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
