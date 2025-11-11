import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import type { DataWrapper } from "../../../features/course/_course";

const HeaderPretes = ({ pretest }: { pretest: DataWrapper | null }) => {
    const navigate = useNavigate();


    return (
        <div className="flex items-center bg-gradient-to-br from-purple-500 to-purple-700 py-6 px-6 pl-15 2xl:pl-47 xl:pl-40 lg:pl-35 md:pl-32 sm:pl-15 gap-x-3 pt-8">
            <button
                onClick={() => navigate(-1)}
                className="text-white text-2xl flex items-center justify-center"
            >
                <FiChevronLeft size={24} className="flex items-center justify-center p-0.5 rounded-full bg-purple-400 text-white"/>
            </button>

            {pretest ? (
                <h1 className="text-white font-semibold text-left text-sm 2xl:text-lg xl:text-lg lg:text-lg md:text-lg sm:text-sm">
                    Pre Test - {pretest.course?.title ?? "Tanpa Judul"}
                </h1>
            ) : (
                <h1 className="text-white font-semibold text-left">
                    Pre Test
                </h1>
            )}
        </div>)
};
export default HeaderPretes;