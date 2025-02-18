import { Team } from "./components/Team";
import { teams } from "./teams";
import type { Team as Profile } from "./types";

function Page() {
	return (
		<div className="max-w-[1440px] mx-auto">
			<div className="text-white py-10 px-5 sm:px-20">
				{/* About Us Section */}
				<section className="text-center">
					<h1 className="text-5xl font-moranga mb-6">
						<span className="bg-gradient-to-r from-[#EA0022] to-[#754DE8] text-transparent bg-clip-text">
							About Us
						</span>
					</h1>
					<p className="text-gray-300 text-sm font-light leading-relaxed max-w-4xl mx-auto mb-10">
						At Retink, we believe content creation should be seamless, efficient, and accessible to
						everyone. That’s why we’ve built an all-in-one platform powered by AI and enhanced by
						human expertise to help businesses, marketers, and creators craft high-quality, on-brand
						content effortlessly.
					</p>
					<p className="text-gray-300 text-sm font-light leading-relaxed max-w-4xl mx-auto mb-10">
						Whether you’re managing social media, writing blogs, or launching marketing campaigns,
						simplecx streamlines the process by automating repetitive tasks, generating tailored
						recommendations, and keeping your creativity at the forefront.
					</p>
					<p className="text-gray-300 text-sm font-light leading-relaxed max-w-4xl mx-auto mb-10">
						Our mission is to empower 1 million individuals and businesses by 2030 to become
						profitable by focusing on what matters most: growing their brand and connecting with
						their audience, while we handle the complexities of content creation. With simplecx, you
						don’t just create - you thrive.
					</p>
					<p className="text-gray-300 text-sm font-light leading-relaxed max-w-4xl mx-auto">
						Join us and redefine how you approach content creation. simplecx: create different
						simplified.
					</p>
				</section>

				{/* Mission Section - Widened Text */}
				<section className="mt-20 text-center">
					<h2 className="text-4xl sm:text-3xl font-moranga w-full max-w-[1000px] mx-auto leading-relaxed">
						We’re on a Bold &nbsp;
						<span className="bg-gradient-to-r from-[#EA0022] to-[#754DE8] text-transparent bg-clip-text">
							Mission
						</span>
						&nbsp;to Help 1 Million Businesses
					</h2>
					<h2 className="text-4xl sm:text-3xl font-moranga w-full max-w-[1000px] mx-auto leading-relaxed">
						Become Profitable by 2030. Ready to Be One of Them?
					</h2>
				</section>

				<section className="mt-20 text-center">
					<h3 className="text-2xl text-gray-300 font-light mb-10">Meet the Team</h3>
					<div className="flex flex-wrap justify-center gap-10">
						{teams.map((member: Profile, index: number) => (
							<Team key={index} team={member} />
						))}
					</div>
				</section>
			</div>
		</div>
	);
}

export default Page;
