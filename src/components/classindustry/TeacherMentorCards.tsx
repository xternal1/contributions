const TeacherMentorCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white dark:bg-purple-900 rounded-2xl shadow-md p-4 flex items-center gap-4 border border-gray-100 dark:border-gray-700 transition-colors duration-500">
            <img
                src="https://i.pravatar.cc/100?img=12"
                alt="wali kelas"
                className="w-16 h-16 rounded-full"
            />
            <div>
                <h2 className="font-semibold text-gray-800 dark:text-white transition-colors duration-500">
                    Suyadi Oke Joss Sp.d
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
                    Walki Kelas XII RPL 1
                </p>
            </div>
        </div>
        <div className="bg-white dark:bg-purple-900 rounded-2xl shadow-md p-4 flex items-center gap-4 border border-gray-100 dark:border-gray-700 transition-colors duration-500">
            <img
                src="https://i.pravatar.cc/100?img=14"
                alt="mentor kelas"
                className="w-16 h-16 rounded-full"
            />
            <div>
                <h2 className="font-semibold text-gray-800 dark:text-white transition-colors duration-500">Alfian Justin</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
                    Mentor Kelas Industry
                </p>
            </div>
        </div>
    </div>
  )
}

export default TeacherMentorCards