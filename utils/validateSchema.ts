import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const ValidateSchema =
  (schema: ZodSchema, location: "body" | "query" | "params") =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validatedData = await schema.parseAsync(req[location]);
      if (location === "body") {
        req.body = validatedData;
      } else {
        res.locals.cleaned = validatedData;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Invalid request data",
          errors: error.flatten().fieldErrors,
        });
        return;
      }
      next(error);
    }
  };
