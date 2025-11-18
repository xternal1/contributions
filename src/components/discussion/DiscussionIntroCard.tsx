const DiscussionIntroCard = () => {
    return (
        <div className="relative min-h-37 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between">
            <div className="text-left px-5 mb-4 md:mb-0 md:flex-1">
                <h5 className="text-xl font-semibold text-white">Forum Diskusi</h5>
                <h2 className="text-2xl font-bold text-white">
                    Selamat Datang, User Di Forum Diskusi
                </h2>
                <p className="text-white mt-1 sm:text-base md:text-base">
                    Konsultasi seputar materi belajar Anda
                </p>
            </div>
            <div className="flex justify-center md:justify-end w-full md:w-auto">
                <img
                    src="/src/assets/img/book.png"
                    alt="Ilustrasi Ujian"
                    className="w-80 sm:w-80 md:w-60 mx-8 mt-6 md:mt-0 2xl:absolute xl:absolute lg:absolute 2xl:right-2 2xl:-bottom-0 xl:right-2 xl:-bottom-0 lg:right-2 lg:-bottom-0"
                />
            </div>
        </div>
    );
};

export default DiscussionIntroCard;


