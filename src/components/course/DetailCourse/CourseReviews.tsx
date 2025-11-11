import type { DetailCourse, RatingBreakdown } from '../../../features/course/_course';

interface CourseReviewsProps {
  courseData: DetailCourse;
}

const renderStarRating = (rating: number, isDarkMode: boolean = false) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span
      key={i + 1}
      className={`text-xl ${
        i + 1 <= Math.floor(rating)
          ? isDarkMode ? "text-white" : "text-yellow-400"
          : i < rating
          ? isDarkMode ? "text-white/50" : "text-yellow-400/50"
          : isDarkMode ? "text-gray-400" : "text-gray-300"
      }`}
    >
      ★
    </span>
  ));
};

const renderRatingBars = (
  ratings: RatingBreakdown,
  total: number,
  isDarkMode: boolean = false
) => {
  return [5, 4, 3, 2, 1].map((starLevel) => {
    const count = ratings[starLevel as keyof RatingBreakdown] || 0;
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return (
      <div key={starLevel} className="flex items-center gap-2">
        <span className="text-sm font-medium w-3 text-right dark:text-white">{starLevel}</span>
        <span className={isDarkMode ? "text-white" : "text-yellow-400"}>★</span>
        <div className="bg-gray-200 dark:bg-gray-700 h-2 w-full rounded-full overflow-hidden">
          <div
            className={isDarkMode ? "bg-white h-full" : "bg-yellow-400 h-full"}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-sm text-gray-600 dark:text-gray-300 w-8 text-right">
          {count}
        </span>
      </div>
    );
  });
};

export default function CourseReviews({ courseData }: CourseReviewsProps) {
  const ratingNumber = Number(courseData.rating) || 0;
  const reviewCount = courseData.course_review_count || 0;

  return (
    <div className="p-1">
      <h3 className="text-[24px] font-verdana font-semibold mb-4 text-black dark:text-white text-left">
        Reviews
      </h3>
      <div className="flex gap-8">
        {/* Kotak rata-rata rating */}
        <div className="text-center p-6 bg-white dark:bg-purple-800 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex-shrink-0 w-40">
          <p className="text-5xl font-bold mb-2 text-gray-800 dark:text-white">
            {ratingNumber.toFixed(1)}
          </p>
          <div className="flex justify-center mb-2">
            {/* Light mode: kuning, Dark mode: putih */}
            <div className="dark:hidden">
              {renderStarRating(ratingNumber, false)}
            </div>
            <div className="hidden dark:flex">
              {renderStarRating(ratingNumber, true)}
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-200 text-sm">{reviewCount} Ratings</p>
        </div>

        {/* Distribusi rating */}
        <div className="flex-grow flex flex-col justify-center gap-2">
          {/* Light mode: kuning, Dark mode: putih */}
          <div className="dark:hidden">
            {renderRatingBars(courseData.ratings, reviewCount, false)}
          </div>
          <div className="hidden dark:block">
            {renderRatingBars(courseData.ratings, reviewCount, true)}
          </div>
        </div>
      </div>
    </div>
  );
}