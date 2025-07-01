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
        const firstError = error.errors[0];
        const mainMessage = firstError?.message || "Validation failed";

        res.status(400).json({
          message: mainMessage,
          errors: error.flatten().fieldErrors,
          details: error.errors.map((err) => err.message).join(", "),
        });
        return;
      }
      next(error);
    }
  };
