// src/pages/guest/news/NewsDetail.tsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsHeader from "@components/news/NewsHeader";
import SkeletonNewsDetail from "@components/news/NewsDetail/SkeletonNewsDetail";
import NewsImageWithModal from "@components/news/NewsDetail/NewsImageWithModal";
import ImageModal from "@components/news/NewsDetail/ImageModal";
import NewsContent from "@components/news/NewsDetail/NewsContent";
import NewsSidebar from "@components/news/NewsDetail/NewsSidebar";
import { useNewsStore } from "@lib/stores/guest/news/useNewsStore";

const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // ambil semua state + action yang dibutuhkan dari store
  const {
    selectedNews: news,
    relatedNews,
    isLoading,
    isModalOpen,
    loadNewsDetail,
    toggleModal,
    saveScrollPosition,
    restoreScrollPosition,
  } = useNewsStore();

  // fetch detail via store action
  useEffect(() => {
    if (!slug) return;
    loadNewsDetail(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // scroll restore/save via store helpers
  useEffect(() => {
    // restore from store/localStorage
    restoreScrollPosition();

    const handleBeforeUnload = () => {
      saveScrollPosition();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [restoreScrollPosition, saveScrollPosition]);

  if (!isLoading && !news) {
    return (
      <div className="text-center py-20 text-gray-500 dark:text-gray-400">
        Berita tidak ditemukan.
      </div>
    );
  }

  if (isLoading || !news) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#141427] pb-20">
        <NewsHeader
          title="Detail Berita"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Berita", href: "/news" },
          ]}
        />

        <SkeletonNewsDetail />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#141427] pb-20">
      {/* Header */}
      <NewsHeader
        title="Detail Berita"
        breadcrumbs={[
          { label: "Beranda", href: "/" },
          { label: "Berita", href: "/news" },
          { label: news.title },
        ]}
      />

      {/* Content & sidebar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-4 grid grid-cols-1 lg:grid-cols-4 gap-2">
        <div className="lg:col-span-3">
          <NewsImageWithModal
            imageUrl={news.thumbnail}
            altText={news.title}
            onImageClick={() => toggleModal(true)}
          />

          {/* Modal */}
          <ImageModal
            isOpen={isModalOpen}
            imageUrl={news.thumbnail}
            altText={news.title}
            onClose={() => toggleModal(false)}
          />

          <NewsContent
            newsTitle={news.title}
            createdAt={news.created}
            description={news.description}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <NewsSidebar relatedArticles={relatedNews} />
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;


