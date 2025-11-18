const DiscussionPagination = () => {
    return (
        <div className="flex justify-center mt-6 gap-2">
            {[1, 2, 3].map((p) => (
                <button
                    key={p}
                    className={`w-8 h-8 rounded-full ${p === 1
                            ? "bg-purple-600 text-white"
                            : "bg-gray-200 hover:bg-purple-200 text-gray-700"
                        }`}
                >
                    {p}
                </button>
            ))}
        </div>
    );
};

export default DiscussionPagination;


