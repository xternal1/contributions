import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiscussionHeader, DiscussionIntroCard, DiscussionActiveFilter, DiscussionCard, DiscussionSidebar, DiscussionSearchFilter, DiscussionPagination, CreateDiscussion } from "../../../../components/discussion";


const DiscussionPage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleClick = (slug: string) => {
        navigate(`/module/discussion/forum/${slug}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 mb-15">
            {/* Header */}
            <div className="2xl:max-w-6xl xl:max-w-5xl lg:max-w-4xl md:max-w-2xl sm:max-w-xl max-w-md mx-auto mt-8">
                <DiscussionHeader onBack={() => navigate(-1)} />

                <DiscussionIntroCard />

                {/* Main Content */}
                <div className="max-w-6xl mx-auto mt-8 flex flex-col lg:flex-row gap-8">
                    {/* Left Section - Discussions */}
                    <div className="flex-1 space-y-4 bg-white rounded-xl p-7 shadow">
                        <DiscussionSearchFilter
                            value={searchValue}
                            onChange={setSearchValue}
                        />

                        <DiscussionActiveFilter />

                        {/* Discussion List */}
                        {[1, 2, 3, 4, 5].map((i) => (
                            <DiscussionCard
                                key={i}
                                onClick={() => handleClick(`modul-${i}`)}
                            />
                        ))}

                        <DiscussionPagination />
                    </div>

                    {/* Right Sidebar */}
                    <DiscussionSidebar onCreateNew={() => setShowModal(true)} />
                </div>
            </div>

            <CreateDiscussion
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />
        </div>
    );
};

export default DiscussionPage;