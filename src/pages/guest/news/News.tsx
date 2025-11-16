// src/pages/guest/news/NewsPage.tsx
import React, { useEffect } from "react";
import { useNewsStore } from "../../../lib/stores/guest/news/useNewsStore";
import NewsHeader from "../../../components/news/NewsHeader";
import SearchFilterSort from "../../../components/news/SearchFilterSort";
import NewsGrid from "../../../components/news/NewsGrid";
import PaginationControls from "../../../components/news/PaginationControl";
import SkeletonSearchFilterSort from "../../../components/news/SkeletonSearchFilterSort";

const NewsPage: React.FC = () => {
  // ambil semua state & actions dari store
  const {
    newsList,
    isLoading,
    searchTerm,
    selectedCategory,
    sortOrder,
    currentPage,
    itemsPerPage,
    loadNews,
    setSearchTerm,
    setSelectedCategory,
    setSortOrder,
    setCurrentPage,
  } = useNewsStore();

  // load news once on mount
  useEffect(() => {
    loadNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // derived
  const categories = ["Semua", ...Array.from(new Set(newsList.map((item) => item.slug.split("-")[0])))];

  const filteredArticles = newsList
    .filter((article) => {
      const matchSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === "Semua" || article.slug.includes(selectedCategory.toLowerCase());
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return sortOrder === "Terbaru"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / itemsPerPage));
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    else if (page > totalPages) page = totalPages;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#141427]">
      {/* Header */}
        <NewsHeader
          title="Berita"
          breadcrumbs={[
            { label: "Beranda", href: "/" },
            { label: "Berita" }
          ]}
        />

      {/* Search, Filter, Sort */}
      {isLoading ? (
        <SkeletonSearchFilterSort />
      ) : (
        <SearchFilterSort
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          sortOrder={sortOrder}
          categories={categories}
          onSearchChange={setSearchTerm}
          onCategoryChange={setSelectedCategory}
          onSortChange={setSortOrder} // Now correctly typed
        />
      )}

      {/* Content */}
      <section className="py-10 bg-white dark:bg-[#141427] rounded-lg">
        <div className="container mx-auto px-5 md:px-20 lg:px-3 xl:px-22 2xl:px-35 text-center">
          <NewsGrid
            articles={paginatedArticles}
            isLoading={isLoading}
            itemsPerPage={itemsPerPage}
            emptyMessage="Tidak ada berita yang cocok."
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;