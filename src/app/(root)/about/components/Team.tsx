import type { Team as Profile } from "../types";

const Team = ({ team }: { team: Profile }) => {
	return (
		<div className="text-left">
			<div className="h-48 w-48 rounded-3xl mx-auto mb-6 overflow-hidden">
				<img src={team.image} alt={team.name} className="h-full w-full object-cover" />
			</div>
			<h4 className="text-xl font-moranga">{team.name}</h4>
			<p className="text-gray-400 font-light">{team.role}</p>
		</div>
	);
};

export { Team };
