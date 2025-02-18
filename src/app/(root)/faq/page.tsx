import { FAQList } from "./components/FAQList";
import { faqs } from "./faqs";

const FAQ: React.FC = () => {
	return (
		<div className="text-white min-h-screen flex flex-col items-center justify-center px-5">
			<div className="w-full mt-24 max-w-6xl mb-24">
				<h1 className="text-4xl font-moranga text-center bg-gradient-to-r from-[#ea0022] to-[#754de8] bg-clip-text text-transparent mb-8">
					Frequently Asked Questions
				</h1>
				<div className="mb-9 max-w-sm mx-auto">
					<input
						type="text"
						placeholder="Search FAQs"
						className="w-full p-2 text-white bg-black rounded-3xl border placeholder:pl-3"
					/>
				</div>
				<div className="rounded-md shadow-lg p-6">
					<FAQList faqs={faqs} />
				</div>
			</div>
		</div>
	);
};

export default FAQ;
