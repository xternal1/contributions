export interface TaskDetail {
  id: string;
  question: string;
  description: string;
  point: number;
  module: {
    id: string;
    title: string;
    slug: string;
    course: {
      title: string;
      slug: string;
    };
  };
  course_photo: string;
  is_finish: boolean;
}