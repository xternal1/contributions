import React from "react";
import type { CourseActivity } from "@features/user/models";
import CardCourses from "@components/public/auth/CardCourses/CardCourses";

interface CourseGridProps {
    courses: CourseActivity[];
}

const CourseGrid: React.FC<CourseGridProps> = ({ courses }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
                <CardCourses
                    key={course.course.id}
                    slug={course.course.slug}
                    title={course.course.title}
                    category={course.course.sub_category.name}
                    photo={course.course.photo}
                    study_percentage={course.study_percentage}
                    rating={course.course.rating}
                    total_module={course.total_module}
                    total_user={course.total_user}
                    study_time={course.study_time}
                    user={course.course.user.name}
                    photo_user={`https://api-getskill.mijurnal.com/storage/${course.course.user.photo}`}
                />
            ))}
        </div>
    );
};

export default CourseGrid;