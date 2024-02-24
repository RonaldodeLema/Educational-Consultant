import CourseItem from './CourseItem';
import DefaultComponent from '../Partials/DefaultComponent';

const Courses = ({ data }) => {
	return (
		<DefaultComponent
			idComponent={'courses'}
			body={
				<>
					{data.Header ? (
						<div className="text-center wow fadeInUp" id="course" data-wow-delay={data.Header.dataWowDelay}>
							<h6 className="section-title bg-white text-center text-primary px-3">
								{data.Header.title}
							</h6>
							<h1 className="mb-5">{data.Header.paragraph}</h1>
						</div>
					) : (
						'Loading'
					)}
					<div className="row g-4 justify-content-center">
						{data.CourseItems
							? data.CourseItems.map((c, i) => (
									<CourseItem
										key={i}
										dataWowDelay={c.dataWowDelay}
										coursePrice={c.coursePrice}
										courseMentor={c.courseMentor}
										courseTitle={c.courseTitle}
										courseQuantity={c.courseQuantity}
										courseHour={c.courseHour}
										courseThumbnail={c.courseThumbnail}
									/>
							  ))
							: 'Loading'}
					</div>
				</>
			}
		/>
	);
};

export default Courses;
