import DOMPurify from "dompurify";
import type { DetailCourse } from "../../../features/course/_course";

interface CourseDescriptionProps {
  courseData: DetailCourse;
}

export default function CourseDescription({ courseData }: CourseDescriptionProps) {
  const safeHtml = DOMPurify.sanitize(courseData.description ?? "");

  return (
    <section className="text-[12px] text-gray-700 dark:text-white transition-colors duration-500">
      <div
        className="
          text-justify leading-relaxed
          space-y-3
          [&_p]:mb-3 [&_p]:leading-relaxed
          [&_ul]:list-disc [&_ul]:pl-5
          [&_ol]:list-decimal [&_ol]:pl-5
          [&_strong]:font-semibold
          [&_*]:dark:text-white
        "
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </section>
  );
}