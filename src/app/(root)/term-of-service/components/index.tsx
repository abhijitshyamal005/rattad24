"use client";

import { useState } from "react";
import { terms } from "../terms";

export default function TermsPage() {
	const [activeSection, setActiveSection] = useState<string>(terms[0].section);

	const handleSectionClick = (section: string) => {
		setActiveSection(section);
		document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<div className="bg-black text-white font-sans">
			<div className="max-w-7xl mx-auto px-4">
				{/* Header */}
				<h1 className="text-center py-4 pt-16 text-4xl font-moranga">
					<span className="bg-gradient-to-r from-[#ea0022] to-[#754de8] bg-clip-text text-transparent">
						Terms of Service
					</span>
				</h1>

				{/* Content */}
				<div className="flex flex-col md:flex-row">
					{/* Sidebar */}
					<aside className="p-4 w-full md:w-1/4 md:sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto ">
						<ul className="space-y-4 mt-6 font-light">
							{terms.map((item, index) => (
								<li key={index} className="block">
									<button
										type="button"
										onClick={() => handleSectionClick(item.section)}
										className={`cursor-pointer transition text-start ${
											activeSection === item.section
												? "bg-gradient-to-r from-[#ea0022] to-[#754de8] bg-clip-text text-transparent font-semibold"
												: "text-gray-400 hover:text-gray-200"
										}`}
									>
										{item.section}
									</button>
								</li>
							))}
						</ul>
					</aside>

					{/* Main Content */}
					<section className="flex-1 p-6 md:pl-8 overflow-y-auto">
						{terms.map((item, index) => (
							<div key={index} id={item.section} className="mb-12">
								<h2 className="text-xl  mb-4">{item.section}</h2>
								{item.isList ? (
									<ul className="list-disc list-inside text-gray-300 leading-7 text-sm">
										{item.content.map((point, pointIndex) => (
											<li key={pointIndex} className="mb-2">
												{point}
											</li>
										))}
									</ul>
								) : (
									<div className="text-gray-300 leading-7 text-sm font-light space-y-4">
										{item.content.map((paragraph, paragraphIndex) => (
											<p key={paragraphIndex}>{paragraph}</p>
										))}
									</div>
								)}
							</div>
						))}
					</section>
				</div>
			</div>
		</div>
	);
}



