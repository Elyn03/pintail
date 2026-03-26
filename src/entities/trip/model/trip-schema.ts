import { z } from "zod";

export const tripData = z
  .object({
    id: z.number().int().positive(),
    created_at: z.string().datetime(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description required"),
    start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    budget_target: z.number().min(0),
    budget_max: z.number().min(0),
    user_id: z.string().uuid({
      message: "Invalid UUID format",
    }),
    expenses: z.number().min(0),
  })
  .refine(
    (data) => {
      const start = new Date(data.start_date + "T00:00:00Z");
      const end = new Date(data.end_date + "T00:00:00Z");
      return end >= start;
    },
    {
      message: "End date must be on or after start date",
      path: ["end_date"],
    }
  );

export type TripDto = z.infer<typeof tripData>;