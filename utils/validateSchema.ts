import { z, AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

type ValidationSource = "body" | "params" | "query";

export const ValidateSchema =
  (schema: AnyZodObject, source: ValidationSource) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req[source] = schema.parse(req[source]);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: `Invalid request ${source}`,
          errors: error.flatten().fieldErrors,
        });
        return;
      }

      res.status(500).json({ message: "Internal Server Error" });
    }
  };
