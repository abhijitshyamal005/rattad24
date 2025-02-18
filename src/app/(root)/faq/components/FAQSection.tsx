import type { FAQSectionProps } from "../types";

const FAQSection: React.FC<FAQSectionProps> = ({ title, items, isActive, toggleSection }) => {
	return (
		<div>
			<button
				onClick={toggleSection}
				className="flex justify-between items-center w-full py-4 text-xl mt-8 text-left text-white"
			>
				<span className="font-moranga">{title}</span>
				<span
					className={`flex items-center text-xl justify-center w-8 h-8 rounded-full ${
						isActive
							? "bg-gradient-to-r from-[#ea0022] to-[#754de8] text-white"
							: "bg-black text-white border border-s-[#ea0022] border-e-[#754de8] border-y-[#ea0022]"
					}`}
				>
					{isActive ? "-" : "+"}
				</span>
			</button>
			{isActive && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 text-gray-300">
					{items.map((item, index) => (
						<div key={index}>
							<h3 className="text-white text-sm font-normal">{item.question}</h3>
							<p className="mt-1 font-light">{item.answer}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export { FAQSection };
