"use client";
import { useState } from "react";
import type { FAQSectionType } from "../types";
import { FAQSection } from "./FAQSection";

const FAQList = ({ faqs }: { faqs: FAQSectionType[] }) => {
	const [activeSections, setActiveSections] = useState<string[]>(["general", "privacy"]);

	const toggleSection = (section: string) => {
		setActiveSections((prevSections) =>
			prevSections.includes(section)
				? prevSections.filter((s) => s !== section)
				: [...prevSections, section],
		);
	};
	return (
		<div className="rounded-md shadow-lg p-6">
			{faqs.map((faq: FAQSectionType) => (
				<FAQSection
					key={faq.key}
					title={faq.title}
					items={faq.items}
					isActive={activeSections.includes(faq.key)}
					toggleSection={() => toggleSection(faq.key)}
				/>
			))}
		</div>
	);
};

export { FAQList };
