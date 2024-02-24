import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import MobileBtn from './Navigation.Mobile.Collapse.Btn';

const Navigation = ({ data }) => {
	const [navbarTop, setNavbarTop] = useState('-100px');
	const location = useLocation();
	const [activeItem, setActiveItem] = useState(location.pathname);

	useEffect(() => {
		setActiveItem(location.pathname);
	}, [location]);

	const checkScrollTop = () => {
		if (window.scrollY > 300) {
			setNavbarTop('0px');
		} else {
			setNavbarTop('-100px');
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', checkScrollTop, { passive: true });
		return () => window.removeEventListener('scroll', checkScrollTop, { passive: true });
	}, []);

	return (
		<nav
			className={`navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0`}
			style={{ top: navbarTop }}
		>
			<Link to={'/'} className="navbar-brand d-flex align-items-center px-4 px-lg-5">
				<h2 className="m-0 text-primary">
					{data ? (
						<>
							{/* <img src={data.logo} alt="" /> */}
							{data.title}
						</>
					) : (
						'Loading...'
					)}
				</h2>
			</Link>
			<MobileBtn />
			<div className="collapse navbar-collapse" id="navbarCollapse">
				<div className="navbar-nav ms-auto p-4 p-lg-0">
					<Link to={'/'} className={`nav-item nav-link ${activeItem === '/' ? 'active' : ''}`}>
						Trang chủ
					</Link>
					<Link to={'/about'} className={`nav-item nav-link ${activeItem === '/about' ? 'active' : ''}`}>
						Về chúng tôi
					</Link>
					<Link to={'/courses'} className={`nav-item nav-link ${activeItem === '/courses' ? 'active' : ''}`}>
						Các khóa học
					</Link>
					<div className="nav-item dropdown">
						<a
							href=" "
							className={`nav-link dropdown-toggle ${
								['/pages/our-team', '/pages/testimonial', '/pages/chat-with-ai'].includes(activeItem)
									? 'active'
									: ''
							}`}
							data-bs-toggle="dropdown"
						>
							Các trang khác
						</a>
						<div className="dropdown-menu fade-down m-0">
							<Link
								to={'/pages/our-team'}
								className={`dropdown-item ${activeItem === '/pages/our-team' ? 'active' : ''}`}
							>
								Đội ngũ giảng viên
							</Link>
							<Link
								to={'/pages/testimonial'}
								className={`dropdown-item ${activeItem === '/pages/testimonial' ? 'active' : ''}`}
							>
								Nhận xét
							</Link>
							<Link
								to={'/pages/chat-with-ai'}
								className={`dropdown-item ${activeItem === '/pages/chat-with-ai' ? 'active' : ''}`}
							>
								Chat với AI
							</Link>
						</div>
					</div>
					<Link to={'/contact'} className={`nav-item nav-link ${activeItem === '/contact' ? 'active' : ''}`}>
						Liên hệ
					</Link>
				</div>
				<Link to={'/signin'} className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
					Đăng nhập
					<i className="fa fa-arrow-right ms-3" />
				</Link>
			</div>
		</nav>
	);
};

export default Navigation;
