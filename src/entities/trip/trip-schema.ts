import {z} from "zod";

export const tripData = z
  .object({
    id: z.number(),
    created_at: z.string().datetime(),
    title: z.string(),
    description: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    budget_target: z.number(),
    budget_max: z.number(),
    user_id: z.string().uuid(),
    expenses: z.number(),
  })
  .refine((data) => new Date(data.end_date) > new Date(data.start_date), {
    message: "End date must be after start date",
    path: ["end_date"]
  });

export type TripDto = z.infer<typeof tripData>;