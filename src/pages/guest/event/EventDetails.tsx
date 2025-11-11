import { useParams } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import BackgroundShapes from "../../../components/public/BackgroundShapes";
import EventPriceCard from "../../../components/public/CardEvent/EventPriceCard";
import StatusIndicator from "../../../components/public/CardEvent/StatusIndicator";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { IoIosAlert } from "react-icons/io";

import { fetchEventDetail } from "../../../features/event/_services/eventService";
import type { Eventype } from "../../../features/event/_event";

import DefaultImg from "../../../assets/Default-Img.png";
import logoGetskill from "../../../assets/img/logo/get-skill/logo.png";


const DetailEvent: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [event, setEvent] = useState<Eventype | null>(null);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const eventIsOver =
        event?.start_in === "selesai" ||
        (!!event?.end_date_raw && new Date(event.end_date_raw) < new Date());

    useEffect(() => {
        const loadEvent = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const eventData = await fetchEventDetail(slug);
                setEvent(eventData);
            } catch (error) {
                console.error("Gagal memuat detail event:", error);
                setEvent(null);
            } finally {
                setLoading(false);
            }
        };
        loadEvent();
    }, [slug]);



    if (!event && !loading) {
        return <div className="text-center py-20 text-gray-500">Event tidak ditemukan</div>;
    }

    const isOnline = Boolean(event?.is_online);

    return (
        <div className="bg-white min-h-screen text-left dark:bg-[#141427] transition-colors duration-500">
            {/* Breadcrumb & Header */}
            <div className="relative px-6 py-11 dark:bg-[#0D0D1A] dark:bg-none bg-gradient-to-r from-indigo-100 via-stone-100 to-fuchsia-100 overflow-hidden">
                <BackgroundShapes />
                <div className="max-w-6xl mx-auto px-4 2xl:px-2 xl:px-18 lg:px-35 md:px-30 sm:px-30 text-left relative z-10">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
                        {event?.title}
                    </h1>
                    <p className="mt-2 text-xs sm:text-xs text-gray-800 dark:text-white">
                        <a href="/">Beranda</a>
                        <span className="mx-1">&gt;</span>
                        <a href="/event">Events</a>
                        <span className="mx-1">&gt;</span>
                        <span className="text-purple-600">{event?.title}</span>
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div
                className={`max-w-7xl mx-auto px-4 sm:px-20 md:px-30 lg:px-30 xl:px-10 2xl:px-10 pt-20 ${isOnline ? "pb-10 xl:pb-150 lg:pb-150" : "pb-10 xl:pb-28 lg:pb-28"
                    }`}
            >
                {eventIsOver && (
                    <div className="max-w-7xl mx-auto pb-5">
                        <div className="bg-orange-100 border border-orange-100 px-10 py-4 rounded-lg flex items-center gap-3">
                            <IoIosAlert size={30} className="text-amber-500" />
                            <span className="font-extrabold italic text-xl text-amber-500">
                                Event Ini telah Berakhir
                            </span>
                        </div>
                    </div>
                )}


                <div className="relative group">
                    {loading ? (
                        <div className="animate-pulse w-full h-80 bg-gray-200 rounded-xl dark:bg-[#0D0D1A]"></div>
                    ) : (
                        <img
                            src={event?.image || DefaultImg}
                            alt={event?.title || "Default"}
                            className="w-full h-130 object-cover rounded-xl cursor-pointer"
                            onClick={() => setIsOpen(true)}
                            onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.onerror = null;
                                target.src = DefaultImg;
                            }}
                        />
                    )}
                    {/* Gradient bawah */}
                    {!loading && (
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 via-transparent to-transparent rounded-b-xl" />
                    )}

                    {/* Overlay hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-lg font-semibold rounded-xl transition-opacity duration-300 cursor-pointer"
                        onClick={() => setIsOpen(true)}>
                        Klik untuk melihat ukuran penuh
                    </div>
                    <div className="absolute right-8 top-[70%] translate-y-[3%] w-85 hidden lg:block space-y-6">
                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-32 bg-gray-200 rounded-xl dark:bg-[#0D0D1A]"></div>
                                <div className="h-32 bg-gray-200 rounded-xl dark:bg-[#0D0D1A]"></div>
                            </div>
                        ) : (
                            <>
                                <EventPriceCard event={event!} eventIsOver={eventIsOver} />
                            </>
                        )}
                    </div>

                    {/* Modal */}
                    {isOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-2">
                            <div className="relative rounded-xl w-full max-w-5xl max-h-[95vh] overflow-y-auto">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-3 right-3 text-white hover:text-gray-300 text-2xl"
                                >
                                    <FiX />
                                </button>
                                <img
                                    src={event?.image}
                                    alt={event?.title}
                                    className="w-full max-h-[90vh] object-contain rounded-lg"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-12 grid grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 w-full xl:max-w-3xl lg:max-w-xl gap-8">
                    <div className="lg:col-span-2">
                        {loading ? (
                            <div className="animate-pulse space-y-4">
                                <div className="h-6 w-32 bg-gray-200 rounded-full dark:bg-[#0D0D1A]"></div>
                                <div className="h-6 w-80 bg-gray-200 rounded-md dark:bg-[#0D0D1A]"></div>
                                <div className="h-20 w-full bg-gray-200 rounded-md dark:bg-[#0D0D1A]"></div>
                            </div>
                        ) : (
                            <>
                                <span className="bg-purple-600 text-white px-3 py-1 text-sm rounded-full inline-block">
                                    {"Seminar"}
                                </span>

                                <h2 className="mt-4 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                    {event?.title}
                                </h2>

                                <div className="flex flex-wrap items-center gap-2 mt-3 text-gray-600 text-sm dark:text-gray-300">
                                    <img
                                        src={logoGetskill}
                                        alt={event?.title}
                                        className="w-8 h-8 rounded-full"
                                    />

                                    <span>
                                        By <a href="#" className="font-normal font-sans">GetSkills</a>
                                    </span>

                                    <span className="text-gray-400">•</span>

                                    <StatusIndicator isOnline={isOnline} />

                                    <span className="text-gray-400">•</span>

                                    <span className="flex items-center gap-1">
                                        <GraduationCap /> {event?.capacity_left} Peserta
                                    </span>
                                </div>
                                <div className="w-full border-t-2 border-gray-400 my-8 dark:border-white"></div>
                                <p
                                    className="mt-4 text-gray-700 leading-relaxed prose max-w-none dark:text-white"
                                    dangerouslySetInnerHTML={{ __html: event?.description || "" }}
                                />

                                {/* Rundown Table */}
                                <h3 className="mt-8 text-lg font-semibold">Rundown Acara :</h3>
                                <div className="overflow-x-auto mt-4 w-full">
                                    {event?.event_details?.length ? (
                                        <table className="w-full border border-gray-300 rounded-lg text-sm text-left border-collapse min-w-full">
                                            <thead className="bg-purple-600 text-white">
                                                <tr>
                                                    <th className="px-6 py-2 border border-gray-300 text-center whitespace-nowrap">
                                                        Time
                                                    </th>
                                                    <th className="px-4 py-2 border border-gray-300 text-center">
                                                        Session
                                                    </th>
                                                    <th className="px-4 py-2 border border-gray-300 text-center">
                                                        Speaker
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {event.event_details.map((item, index) => {
                                                    const formatTime = (time: string) => time.slice(0, 5);

                                                    return (
                                                        <tr key={index}>
                                                            <td className="px-6 py-2 border border-gray-300 text-center whitespace-nowrap">
                                                                {formatTime(item.start)} - {formatTime(item.end)}
                                                            </td>
                                                            <td className="px-4 py-2 border border-gray-300">
                                                                {item.session}
                                                            </td>
                                                            <td className="px-4 py-2 border font-bold border-gray-300 whitespace-nowrap">
                                                                {item.user}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>

                                        </table>
                                    ) : (
                                        <p className="text-gray-500">Rundown belum tersedia.</p>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Maps Lokasi (hanya muncul kalau offline) */}
                        {!isOnline && !loading && (
                            <div className="mt-12">
                                <h3 className="text-lg font-semibold mb-4">Maps Lokasi:</h3>
                                <div className="w-full rounded-xl overflow-hidden shadow">
                                    <iframe
                                        src={`https://www.google.com/maps?q=${encodeURIComponent(event?.location || "")}&output=embed`}
                                        width="100%"
                                        height="400"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={`lg:hidden space-y-6 ${isOnline ? "pb-1" : "pb-0"}`}>
                        {!loading && (
                            <>
                                <EventPriceCard event={event!} eventIsOver={eventIsOver} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailEvent;
