import { label } from "framer-motion/client";

export const tabData = [
	{ id: "dynamic", label: "Dynamic (Coming Soon)" },
	{ id: "bundle", label: "Bundle" },
	{ id: "credit", label: "Credit" },
	{ id: "freelance", label: "Freelance Partners (Coming Soon)" },
] as const;

export type TabId = (typeof tabData)[number]["id"];
