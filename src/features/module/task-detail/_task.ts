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
  submission_task: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    grade: number | null;
    file: string | null; 
    answer: string | null; 
    created_at: string;
  }[];
}