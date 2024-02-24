import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

export const Navigation = forwardRef((props, ref) => {
	const currentPath = window.location.pathname;
	if (currentPath === '/chat') {
		return (
			<nav id="menu" className="navbar navbar-default navbar-fixed-top" ref={ref}>
				<div className="container">
					<div className="navbar-header">
						<button
							title=""
							type="button"
							className="navbar-toggle collapsed"
							data-toggle="collapse"
							data-target="#bs-example-navbar-collapse-1"
						>
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar" />
							<span className="icon-bar" />
							<span className="icon-bar" />
						</button>
						<Link to={'/'}>
							<span className="navbar-brand page-scroll"> {props.data ? props.data.title : `React Landing Page`}</span>
						</Link>
					</div>
				</div>
			</nav>
		);
	}

	return (
		<nav id="menu" className="navbar navbar-default navbar-fixed-top" ref={ref}>
			<div className="container">
				<div className="navbar-header">
					<button
						title=""
						type="button"
						className="navbar-toggle collapsed"
						data-toggle="collapse"
						data-target="#bs-example-navbar-collapse-1"
					>
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar" />
						<span className="icon-bar" />
						<span className="icon-bar" />
					</button>
					<a className="navbar-brand page-scroll" href="#page-top">
						{props.data ? props.data.title : `React Landing Page`}
					</a>
				</div>

				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul className="nav navbar-nav navbar-right">
						<li>
							<a href="#features" className="page-scroll">
								Features
							</a>
						</li>
						<li>
							<a href="#about" className="page-scroll">
								About
							</a>
						</li>
						{/* <li>
							<a href="#services" className="page-scroll">
								Services
							</a>
						</li> */}
						<li>
							<a href="#portfolio" className="page-scroll">
								Gallery
							</a>
						</li>
						<li>
							<a href="#testimonials" className="page-scroll">
								Testimonials
							</a>
						</li>
						<li>
							<a href="#team" className="page-scroll">
								Team
							</a>
						</li>
						<li>
							<a href="#contact" className="page-scroll">
								Contact
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
});
