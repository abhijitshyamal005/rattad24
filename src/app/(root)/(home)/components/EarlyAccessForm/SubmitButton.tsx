"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ disabled }: { disabled: boolean; }) => {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			className="w-full button button-lg button-primary text-white py-2 rounded-3xl text-lg font-medium hover:opacity-90"
			disabled={pending || disabled}
		>
			Reserve My Spot for Early Access
		</Button>
	);
};

export { SubmitButton };
