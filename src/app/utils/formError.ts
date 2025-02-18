import { ZodError } from "zod";

export const fromErrorToFormState = (error: unknown): { message: {}; status: boolean } => {
	if (error instanceof ZodError) {
		return {
			message: error.flatten().fieldErrors,
			status: false,
		};
	} else if (error instanceof Error) {
		return {
			message: {},
			status: false,
		};
	} else {
		return {
			message: {},
			status: false,
		};
	}
};
