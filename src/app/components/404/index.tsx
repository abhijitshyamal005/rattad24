"use client";

import Link from "next/link";

export default function Custom404() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-black text-white">
			<div className="flex flex-col md:flex-row items-center  max-w-5xl mx-auto">
				{/* Left Section: Text and Buttons */}
				<div className="text-center md:text-left md:w-1/2 space-y-8">
					<h1 className="text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-t from-[#ea0022] to-[#754de8]">
						404
					</h1>
					<p className="text-2xl font-light ">Oops there's nothing here...</p>
					<p className="text-gray-100 font-light">
						We can't find the page you are looking for. Try going back to the home page or contact
						support for more information.
					</p>
					<div className="flex justify-center md:justify-start space-x-4">
						<Link href="/">
							<button
								type="button"
								className="button button-lg button-primary bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-medium text-lg"
							>
								Go to Homepage
							</button>
						</Link>
						<div role="link" className="button button-as-link button-primary button-lg p-[1px]">
							<Link
								href="/"
								className="flex h-full w-full bg-[#111111] rounded-full px-6 py-3 text-lg font-medium hover:bg-purple-500 text-white"
							>
								Contact Support
							</Link>
						</div>
					</div>
				</div>

				{/* Right Section: Illustration */}
				<div className="mt-10 md:mt-0 md:w-1/2 md:ml-16">
					<img src="/404-img.png" alt="404 Illustration" className="w-full max-w-sm mx-auto" />
				</div>
			</div>
		</div>
	);
}
