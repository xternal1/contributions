import { Card } from "flowbite-react";
import { LuBookMinus, LuClock } from "react-icons/lu";
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

interface CardCoursesProps {
    slug: string;
    title: string;
    category: string;
    photo: string;
    study_percentage: number;
    rating: number;
    total_module: number;
    total_user: number;
    study_time: string;
    user: string;
    photo_user: string;
}

const CardCourses = ({
    slug,
    title,
    category,
    photo,
    study_percentage,
    rating,
    total_module,
    total_user,
    study_time,
    user,
    photo_user,
}: CardCoursesProps) => {
    
    // fungsi untuk render bintang
    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                // full star
                stars.push(
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.176 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.087 2.243a1 1 0 00-.364 1.118l1.176 3.63c.3.921-.755 1.688-1.54 1.118l-3.087-2.243a1 1 0 00-1.175 0l-3.087 2.243c-.785.57-1.84-.197-1.54-1.118l1.176-3.63a1 1 0 00-.364-1.118L2.49 9.057c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.176-3.63z" />
                    </svg>
                );
            } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
                // half star
                stars.push(
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <defs>
                            <linearGradient id={`half-${i}`}>
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                        <path
                            fill={`url(#half-${i})`}
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.176 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.087 2.243a1 1 0 00-.364 1.118l1.176 3.63c.3.921-.755 1.688-1.54 1.118l-3.087-2.243a1 1 0 00-1.175 0l-3.087 2.243c-.785.57-1.84-.197-1.54-1.118l1.176-3.63a1 1 0 00-.364-1.118L2.49 9.057c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.176-3.63z"
                        />
                    </svg>
                );
            } else {
                // empty star
                stars.push(
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.176 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.087 2.243a1 1 0 00-.364 1.118l1.176 3.63c.3.921-.755 1.688-1.54 1.118l-3.087-2.243a1 1 0 00-1.175 0l-3.087 2.243c-.785.57-1.84-.197-1.54-1.118l1.176-3.63a1 1 0 00-.364-1.118L2.49 9.057c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.176-3.63z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    return (
        <Link to={`/course/${slug}`}>
            <Card className="h-full card-shine relative flex flex-col justify-between border rounded-2xl shadow-sm hover:shadow-[8px_8px_0_#D3DAD9] hover:scale-[1.02] transition-all duration-300 cursor-pointer p-0 overflow-visible z-10">
                {/* Gambar */}
                <div className="relative -mt-1 -mx-1">
                    <div className="shine__animate">
                        <img
                            src={photo || "/src/assets/Default-Img.png"}
                            alt={title}
                            className="h-35 w-full object-cover rounded-xl"
                            onError={(e) => {
                                e.currentTarget.src = "/src/assets/Default-Img.png";
                            }}
                        />
                    </div>
                </div>

                {/* Konten */}
                <div className="text-left flex-1 flex flex-col justify-between">
                    {/* Badge kategori */}
                    <div>
                        <span className="inline-block text-[12px] font-semibold px-2 py-0.5 rounded-md bg-purple-600 text-white mb-2">
                            {category}
                        </span>
                    </div>

                    {/* Judul */}
                    <h3 className="text-sm font-semibold line-clamp-3 min-h-[50px] mb-1">
                        <a className="inline bg-[linear-gradient(black,black),linear-gradient(black,black)]
                          bg-[length:0%_2px,0_2px]
                          bg-[position:100%_100%,0_100%]
                          bg-no-repeat
                          transition-[background-size] duration-900
                          hover:bg-[length:0_2px,100%_2px]">
                            {title}
                        </a>
                    </h3>

                    {/* Author + rating */}
                    <div className="flex items-center justify-between gap-2 text-gray-500 text-xs mb-3">
                        <div className="flex items-center gap-1">
                            <img
                                src={photo_user || "/src/assets/img/no-image/no-profile.jpeg"}
                                alt="user"
                                className="w-5 h-5 rounded-full"
                            />
                            <span className="text-gray-700">{user}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="flex">{renderStars(rating)}</div>
                            <span className="ml-1">{rating.toFixed(1)}</span>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-3">
                        <div className="flex justify-between text-[10px] font-semibold text-gray-600 mb-1">
                            <span>COMPLETE</span>
                            <span>{study_percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${study_percentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Footer info */}
                    <div className="flex items-center justify-center text-[10px] text-gray-600 border-t pt-2">
                        <div className="flex items-center gap-2">
                            <LuBookMinus size={20} />
                            <span>{total_module}</span>

                            <span className="text-gray-400">•</span>

                            <LuClock size={20} />
                            <span>{study_time}</span>

                            <span className="text-gray-400">•</span>

                            <GraduationCap size={22} />
                            <span>{total_user}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default CardCourses;
