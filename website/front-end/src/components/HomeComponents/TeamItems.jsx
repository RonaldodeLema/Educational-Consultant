import TeamItem from './TeamItem';

const TeamItems = ({ TeamItems }) => {
	return (
		<div className="row g-4">
			{TeamItems.map((t, i) => (
				<TeamItem
					key={i}
					dataWowDelay={t.dataWowDelay}
					instructorName={t.instructorName}
					instructorImage={t.instructorImage}
					job={t.job}
				/>
			))}
		</div>
	);
};

export default TeamItems;
