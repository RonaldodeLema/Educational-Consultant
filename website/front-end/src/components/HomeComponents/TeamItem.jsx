import Scroll2EleWithId from '../Scroll2EleWithId';

const TeamItem = ({ dataWowDelay, instructorName, instructorImage, job }) => {
	return (
		<div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={dataWowDelay}>
			<div className="team-item bg-light">
				<div className="overflow-hidden">
					<img className="img-fluid" src={instructorImage} alt="" />
				</div>
				<div className="position-relative d-flex justify-content-center" style={{ marginTop: '-23px' }}>
					<div className="bg-light d-flex justify-content-center pt-2 px-1">
						<a className="btn btn-sm-square btn-primary mx-1" onClick={() => Scroll2EleWithId('team')}>
							{''}
							<i className="fab fa-facebook-f" />
						</a>
						<a className="btn btn-sm-square btn-primary mx-1" onClick={() => Scroll2EleWithId('team')}>
							{''}
							<i className="fab fa-twitter" />
						</a>
						<a className="btn btn-sm-square btn-primary mx-1" onClick={() => Scroll2EleWithId('team')}>
							{''}
							<i className="fab fa-instagram" />
						</a>
					</div>
				</div>
				<div className="text-center p-4">
					<h5 className="mb-0">{instructorName}</h5>
					<small>{job}</small>
				</div>
			</div>
		</div>
	);
};

export default TeamItem;
