export interface FAQItem {
	question: string;
	answer: string;
}

export type FAQSectionType = {
	key: string;
	title: string;
	items: FAQItem[];
};

export interface FAQSectionProps {
	key: string;
	title: string;
	items: FAQItem[];
	isActive: boolean;
	toggleSection: () => void;
}
