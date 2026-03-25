import {z} from "zod";

export const tripData = z
  .object({
    id: z.string().uuid(),
    created_at: z.string().datetime(),
    title: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    budgetTarget: z.number(),
    budgetMax: z.number(),
    userId: z.string(),
    steps: z.array(z.object({
      title: z.string(),
      description: z.string()
    })),
    expenses: z.number()
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"]
  });

export type TripDto = z.infer<typeof tripData>;