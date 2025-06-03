import { createRoleSchema, getRoleByIdSchema } from "../schemas/roleSchema.js";
import {
  createRoleService,
  getRoleByIdService,
} from "../services/roleServices.js";
import { ValidateSchema } from "../utils/validateSchema.js";

export const createRoleController = async (req, res) => {
  try {
    const { role_name, permission } = ValidateSchema(
      createRoleSchema,
      req.body
    );
    const role = await createRoleService(role_name, permission);
    res.status(201).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRoleByIdController = async (req, res) => {
  try {
    const { id } = ValidateSchema(getRoleByIdSchema, req.params);
    const role = await getRoleByIdService(id);
    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
