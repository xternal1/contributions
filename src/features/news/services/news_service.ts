import api from "../../../services/api";
import type { _News } from "../_news";

// Fetch news list
export async function fetchNews(): Promise<_News[]> {
    try {
        const response = await api.get("/api/blogs");
        return response.data?.data?.data || [];
    } catch (error) {
        console.error("Gagal mengambil data berita:", error);
        throw error;
    }
}

// Fetch news detail by slug
export async function fetchNewsDetail(slug: string): Promise<_News> {
    try {
        const response = await api.get(`/api/blog-detail/${slug}`);
        return response.data?.data;
    } catch (error) {
        console.error(`Gagal mengambil detail berita slug ${slug}:`, error);
        throw error;
    }
}
