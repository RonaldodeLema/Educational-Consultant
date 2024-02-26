import { Link } from 'react-router-dom';
import Scroll2EleWithId from './../Scroll2EleWithId';

const FirstContainer = ({ data }) => {
	return (
		<div className="container py-5">
			<div className="row g-5">
				{data.QuickLinks ? (
					<div className="col-lg-4 col-md-6">
						<h4 className="text-white mb-3">{data.QuickLinks.title}</h4>
						{data.QuickLinks.links.map((l, i) => (
							<Link className="btn btn-link" to={l.path} key={i}>
								{l.text}
							</Link>
						))}
					</div>
				) : (
					'Loading...'
				)}
				{data.Contact ? (
					<div className="col-lg-4 col-md-6">
						<h4 className="text-white mb-3">{data.Contact.title}</h4>
						<p className="mb-2">
							<i className="fa fa-map-marker-alt me-3" />
							{data.Contact.address}
						</p>
						<p className="mb-2">
							<i className="fa fa-phone-alt me-3" />
							{data.Contact.phone}
						</p>
						<p className="mb-2">
							<i className="fa fa-envelope me-3" />
							{data.Contact.email}
						</p>
						<div className="d-flex pt-2">
							<a className="btn btn-outline-light btn-social" onClick={() => Scroll2EleWithId('root')}>
								{''}
								<i className="fab fa-twitter" />
							</a>
							<a className="btn btn-outline-light btn-social" onClick={() => Scroll2EleWithId('root')}>
								{''}
								<i className="fab fa-facebook-f" />
							</a>
							<a className="btn btn-outline-light btn-social" onClick={() => Scroll2EleWithId('root')}>
								{''}
								<i className="fab fa-youtube" />
							</a>
							<a className="btn btn-outline-light btn-social" onClick={() => Scroll2EleWithId('root')}>
								{''}
								<i className="fab fa-linkedin-in" />
							</a>
						</div>
					</div>
				) : (
					'Loading...'
				)}
				{data.Gallery ? (
					<div className="col-lg-4 col-md-6">
						<h4 className="text-white mb-3">{data.Gallery.title}</h4>
						<div className="row g-2 pt-2">
							{data.Gallery.imgs.map((url, i) => (
								<div className="col-4" key={i}>
									<img className="img-fluid bg-light p-1" src={url} alt="" />
								</div>
							))}
						</div>
					</div>
				) : (
					'Loading...'
				)}
				{/* {data.Newsletter ? (
					<div className="col-lg-3 col-md-6">
						<h4 className="text-white mb-3">{data.Newsletter.title}</h4>
						<p>{data.Newsletter.sub_title}</p>
						<div className="position-relative mx-auto" style={{ maxWidth: '400px' }}>
							<input
								className="form-control border-0 w-100 py-3 ps-4 pe-5"
								type="text"
								placeholder="Your email"
								aria-label=""
							/>
							<button
								type="button"
								className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
							>
								SignUp
							</button>
						</div>
					</div>
				) : (
					'Loading...'
				)} */}
			</div>
		</div>
	);
};

export default FirstContainer;
