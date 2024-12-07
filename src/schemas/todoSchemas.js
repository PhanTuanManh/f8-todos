import * as z from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]).default("low"),
  status: z.enum(["doing", "done"]).default("doing"),
});
