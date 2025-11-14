import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import book from "../../../../assets/img/book.png";
import empty from "../../../../assets/img/no-data/empty.svg";
import { useDiscussionData, useDiscussionActions, useDiscussionDerived } from '../../../../lib/stores/user/module/useDiscussionStore';
import DiscussionHeader from '../../../../components/discussion/DiscussionHeader';
import SearchBar from '../../../../components/discussion/SearchBar';
import DiscussionDropdown from "../../../../components/discussion/DiscussionDropdown";
import TagFilter from '../../../../components/discussion/TagFilter';
import DiscussionFilterSidebar from '../../../../components/discussion/DiscussionFilterSidebar';
import DiscussionCard from '../../../../components/discussion/DiscussionCard';
import PaginationControls from '../../../../components/discussion/PaginationControl';
import NewDiscussionModal from '../../../../components/discussion/NewDiscussionModal';
import DiscussionSkeleton from '../../../../components/discussion/DiscussionSkeleton';
import EmptyState from '../../../../components/discussion/EmptyState';

const DiscussionPage = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();

    // Get state and actions from store
    const {
        modules,
        tags,
        currentUser,
        loadingDiscussions,
        filter: { selectedModule, search, selectedTags, filterStatus, sortOrder },
        newDiscussion: {
            showModal,
            selectedModuleForNewDiscussion,
            title,
            description,
            tagsInput
        },
        pagination: { currentPage }
    } = useDiscussionData();

    const {
        fetchModules,
        fetchDiscussions,
        fetchAllTags,
        fetchUserProfile,
        setSelectedModule,
        setSearch,
        toggleTag,
        setFilterStatus,
        setSortOrder,
        openNewDiscussionModal,
        closeNewDiscussionModal,
        setSelectedModuleForNewDiscussion,
        setTitle,
        setDescription,
        setTagsInput,
        submitDiscussion,
        setCurrentPage,
        nextPage,
        prevPage
    } = useDiscussionActions();

    const {
        getPaginatedDiscussions,
        getTotalPages,
    } = useDiscussionDerived();

    // Effects for data fetching
    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    useEffect(() => {
        if (slug) {
            fetchModules(slug);
            fetchDiscussions(slug);
        }
    }, [slug, selectedModule, filterStatus, sortOrder, fetchModules, fetchDiscussions]);

    useEffect(() => {
        fetchAllTags();
    }, [fetchAllTags]);

    // Handlers
    const handleClick = (discussionSlug: string) => {
        navigate(`/module/discussion/forum/${discussionSlug}`);
    };

    const handleTagClick = (tagName: string) => {
        toggleTag(tagName);
    };

    const handleSubmitDiscussion = async () => {
        try {
            if (slug) {
                await submitDiscussion(slug);
                toast.success("Diskusi berhasil dibuat!");
            }
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Gagal membuat diskusi!");
        }
    };

    const totalPages = getTotalPages();
    const paginatedDiscussions = getPaginatedDiscussions();

    return (
        <div className="min-h-screen bg-gray-100 pb-15 dark:bg-[#141427] transition-colors duration-500">
            {/* Header */}
            <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-sm mx-auto pt-8">
                <DiscussionHeader
                    onBack={() => navigate(-1)}
                    title="Kembali"
                />

                {/* Card Intro */}
                <div className="relative min-h-37 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="text-left px-5 mb-4 md:mb-0 md:flex-1">
                        <h5 className="text-xl font-semibold text-white">Forum Diskusi</h5>
                        <h2 className="text-2xl font-bold text-white">
                            Selamat Datang, {currentUser?.name || "User"} Di Forum Diskusi
                        </h2>
                        <p className="text-white mt-1 sm:text-base md:text-base">
                            Konsultasi seputar materi belajar Anda
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-end w-full md:w-auto">
                        <img
                            src={book}
                            alt="Ilustrasi Ujian"
                            className="w-80 sm:w-80 md:w-60 mx-8 mt-6 md:mt-0 2xl:absolute xl:absolute lg:absolute 2xl:right-2 2xl:-bottom-0 xl:right-2 xl:-bottom-0 lg:right-2 lg:-bottom-0"
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-6xl mx-auto mt-8 flex flex-col lg:flex-row gap-8">
                    {/* Left Section - Discussions */}
                    <div className="flex-1 space-y-4 bg-white rounded-xl p-7 shadow dark:bg-[#0D0D1A] dark:border-2 dark:border-white transition-colors duration-500">
                        {/* Search & Filter */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <SearchBar
                                value={search}
                                onChange={setSearch}
                                placeholder="Cari topik diskusi..."
                            />
                            <div className="w-full md:w-1/3">
                                <DiscussionDropdown
                                    modules={modules}
                                    selectedModule={selectedModule}
                                    onChange={setSelectedModule}
                                />
                            </div>
                        </div>

                        {/* Tag Filter */}
                        <TagFilter
                            selectedTags={selectedTags}
                            onTagClick={toggleTag}
                        />

                        {/* Discussion List */}
                        {loadingDiscussions ? (
                            <DiscussionSkeleton />
                        ) :
                            paginatedDiscussions.length > 0 ? (
                                paginatedDiscussions.map((item) => (
                                    <DiscussionCard
                                        key={item.id}
                                        item={item}
                                        onClick={handleClick}
                                    />
                                ))
                            ) : (
                                <EmptyState
                                    message="Tidak ada diskusi ditemukan."
                                    imageSrc={empty}
                                />
                            )
                        }

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <PaginationControls
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                                onNextPage={nextPage}
                                onPrevPage={prevPage}
                            />
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <DiscussionFilterSidebar
                        modules={modules}
                        filterStatus={filterStatus}
                        sortOrder={sortOrder}
                        tags={tags}
                        selectedTags={selectedTags}
                        onCreateDiscussion={openNewDiscussionModal}
                        onFilterStatusChange={setFilterStatus}
                        onSortOrderChange={setSortOrder}
                        onTagClick={handleTagClick}
                    />
                </div>
            </div>

            {/* Modal */}
            <NewDiscussionModal
                isOpen={showModal}
                modules={modules.map(module => ({
                    id: Number(module.id),
                    title: module.title
                }))}
                tags={tags}
                selectedModule={selectedModuleForNewDiscussion}
                title={title}
                description={description}
                tagsInput={tagsInput}
                onClose={closeNewDiscussionModal}
                onModuleChange={setSelectedModuleForNewDiscussion}
                onTitleChange={setTitle}
                onDescriptionChange={setDescription}
                onTagsChange={setTagsInput}
                onSubmit={handleSubmitDiscussion}
            />
        </div>
    );
};

export default DiscussionPage;