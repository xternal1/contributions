import api from "../../../services/api";
import type { Discussion, DiscussionCourse,  DiscussionTag, DiscussionAnswer } from "../_discussion";

// =============================
// DISCUSSION
// =============================


export async function fetchModules(slug: string): Promise<DiscussionCourse[]> {
    try {
        const response = await api.get(`/api/modules/${slug}`);
        return response.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data discussion:", error);
        throw error;
    }
}

export async function fetchDiscussions(
    slug: string,
    moduleId?: string,
    filterStatus?: string[],
    sortOrder?: string[]
): Promise<Discussion[]> {
    try {
        const params = new URLSearchParams();

        if (moduleId) params.append("module", moduleId);
        if (filterStatus?.includes("answered")) params.append("answered", "true");
        if (filterStatus?.includes("unanswered")) params.append("unanswered", "true");
        if (sortOrder?.includes("latest")) params.append("latest", "true");
        if (sortOrder?.includes("oldest")) params.append("oldest", "true");

        const url = `/api/discussions/course/${slug}?${params.toString()}`;
        const response = await api.get(url);
        return response.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data discussion:", error);
        throw error;
    }
}


export async function fetchTags(): Promise<DiscussionTag[]> {
    try {
        const response = await api.get(`/api/tags`);
        return response.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data tags:", error);
        throw error;
    }
}

export async function fetchSubmitTags(name: string): Promise<DiscussionTag> {
    try {
        const formData = new FormData();
        formData.append("name", name);

        const response = await api.post(`/api/tags`, formData);
        return response.data?.data;
    } catch (error) {
        console.error("Gagal menambahkan tag:", error);
        throw error;
    }
}

export async function fetchSubmitDiscussion(
    slug: string,
    formData: FormData
): Promise<Discussion[]> {
    try {
        const response = await api.post(`/api/discussions/${slug}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data?.data || [];
    } catch (error) {
        console.error("Gagal mengirim data diskusi:", error);
        throw error;
    }
}

// =============================
// DISCUSSION ANSWER
// =============================


export async function fetchDiscussionsBySlug(slug: string): Promise<Discussion | null> {
    try {
        const response = await api.get(`/api/discussions/${slug}`);
        return response.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data discussion:", error);
        throw error;
    }
}


export async function fetchDiscussionAnswers(discussion_id: string): Promise<DiscussionAnswer[]> {
    try {
        const response = await api.get(`/api/discussion-answers/${discussion_id}`);
        return response.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data discussion:", error);
        throw error;
    }
}


export async function fetchSubmitAnswer(
    payload: {
        discussion_id: string;
        answer: string;
        user_id: string | number;
    }
): Promise<DiscussionAnswer> {
    try {
        const response = await api.post(`/api/discussion-answers/${payload.discussion_id}`, payload);
        return response.data?.data;
    } catch (error) {
        console.error("Gagal mengirim jawaban:", error);
        throw error;
    }
}


export async function fetchSubmitAnswerUser(
  discussion_id: string,
  discussion_answer: string,
  payload: {
    user_id: string | number;
    answer: string;
  }
): Promise<DiscussionAnswer> {
  try {
    const response = await api.post(
      `/api/discussion-answers/${discussion_id}/${discussion_answer}`,
      payload
    );
    return response.data?.data;
  } catch (error) {
    console.error("Gagal mengirim balasan terhadap jawaban:", error);
    throw error;
  }
}