import { Pencil, Trash2 } from "lucide-react";
import DashboardLayout from "../../../components/public/auth/DashboardLayout";

import empty from "../../../assets/img/no-data/empty.svg";


const ReviewsPage = () => {
    const reviews = [
        {
            id: 1,
            kursus: "React Dasar",
            feedback: "Materinya jelas dan mudah dipahami",
        },
    ];

    return (
        <DashboardLayout slug="reviews">
            <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8 ">
                {/* Aktivitas Belajar */}
                <section className="text-start">
                    <h2 className="text-xl font-bold mb-5">Reviews</h2>

                    {/* Table Reviews */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
                        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 font-medium text-gray-700">Kursus</th>
                                    <th className="px-4 py-3 font-medium text-gray-700">Feedback</th>
                                    <th className="px-4 py-3 font-medium text-gray-700">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {reviews.length > 0 ? (
                                    reviews.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-4 py-3">{item.kursus}</td>
                                            <td className="px-4 py-3">{item.feedback}</td>
                                            <td className="px-4 py-3 text-center">
                                                <div className="flex jutify-center items-center gap-2 ">
                                                    <button
                                                         className="p-2 rounded-md border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white active:bg-yellow-500"
                                                        title="edit"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        className="p-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-600"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-6 text-center text-gray-500">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <img
                                                    className="w-48"
                                                    src={empty}
                                                    alt="no-data"
                                                />
                                                <p className="text-black text-lg font-bold">Data Kosong</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>
        </DashboardLayout>
    )
};

export default ReviewsPage