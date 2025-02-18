import { z } from "zod";

const earlyAccessFormSchema = z.object({
	fullName: z.coerce.string().min(2),
	email: z.coerce.string().email(),
	businessName: z.coerce.string().min(2),
	referralCode: z.coerce.string().optional(),
	updates: z.boolean().optional(),
});

export { earlyAccessFormSchema };
