import { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    HiOutlineUsers,
    HiOutlineClock,
    HiOutlineLocationMarker,
    HiOutlineGlobeAlt,
    HiOutlineEye,
    HiOutlineX,
} from "react-icons/hi";
import { BiSolidCommentDetail } from "react-icons/bi";
import type { EventActivity } from "../../../../features/user/models";
import DefaultImg from "../../../../assets/Default-Img.png";

import { toast } from "react-hot-toast";

interface CardEventProps {
    event: EventActivity;
    variant?: "default" | "user" | "history";
    onCancel?: (id: number, reason?: string) => void | Promise<void>;
}

const CardEvent = ({ event, variant = "default", onCancel }: CardEventProps) => {
    const evt = event.event;

    const [openModal, setOpenModal] = useState(false);
    const [openReasonModal, setOpenReasonModal] = useState(false);
    const [reason, setReason] = useState("");
    const [agree, setAgree] = useState(false);

    useEffect(() => {
    const hasModalOpen = openModal || openReasonModal;
    document.body.style.overflow = hasModalOpen ? "hidden" : "auto";
    return () => {
        document.body.style.overflow = "auto";
    };
}, [openModal, openReasonModal]);

    const handleSubmitCancel = () => {
        if (!reason.trim()) {
            toast.error("Alasan pembatalan wajib diisi!");
            return;
        }

        if (!agree) {
            toast.error("Anda harus menyetujui persetujuan sebelum mengajukan.");
            return;
        }

        onCancel?.(event.id, reason);

        toast.success("Pengajuan pembatalan telah dikirim.");

        setOpenModal(false);
        setReason("");
        setAgree(false);
    };



    const renderButtons = () => {
        if (variant === "user") {
            // event yang sedang diikuti
            switch (event.event_time_status) {
                case "Sudah Berlalu":
                    return (
                        <span className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded-xl font-bold text-xs text-center">
                            Sudah Berlalu
                        </span>
                    );
                case "Sedang Berlangsung":
                    return (
                        <span className="flex-1 px-4 py-2.5 bg-purple-100 text-purple-400 dark:bg-purple-950 rounded-xl font-bold text-[11px] text-center">
                            Sedang Berlangsung
                        </span>
                    );
                case "Akan Datang":
                    return (
                        <span className="flex-1 px-4 py-2.5 bg-yellow-100 text-yellow-400 dark:bg-yellow-800 rounded-xl font-bold text-xs text-center">
                            Akan Datang
                        </span>
                    );
                default:
                    return null;
            }
        }

        if (variant === "history") {
            switch (event.status) {
                case "accepted":
                    return (
                        <span className="flex-1 px-4 py-2.5 bg-purple-100 text-purple-400 dark:bg-purple-950 rounded-xl font-bold text-xs text-center">
                            Diterima
                        </span>
                    );

                case "declined":
                    return (
                        <span className="flex-1 px-4 py-2.5 bg-red-100 text-red-700 dark:bg-red-600 dark:text-white rounded-xl font-bold text-xs text-center">
                            Ditolak
                        </span>
                    );

                case "pending":
                    return (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenModal(true);
                            }}
                            className="flex-1 px-4 py-2.5 bg-red-100 dark:bg-red-600 dark:hover:bg-red-700 text-red-700 dark:text-white rounded-xl font-bold text-xs text-center hover:text-white hover:bg-red-700 transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                                        hover:shadow-none active:translate-y-0.5"
                        >
                            Batal Ikuti
                        </button>
                    );
                case "canceled":
                    return (
                        <span className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded-xl font-bold text-xs text-center">
                            Dibatalkan
                        </span>
                    );
                default:
                    return null;
            }
        }

    };

    const DefaultCard = () => (
        <Link to={`/event/${evt.slug}`}>
             <Card className="h-full card-shine relative flex flex-col justify-between border rounded-2xl shadow-sm hover:shadow-[8px_8px_0_#D3DAD9] hover:scale-[1.02] transition-all duration-300 cursor-pointer p-0 overflow-visible z-10 dark:bg-[#0D0D1A] dark:border-white dark:hover:border-purple-500 dark:shadow-[0_0_15px_rgba(128,90,213,0.2)] dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                <div className="relative -mt-1 -mx-1">
                    <div className="shine__animate">
                        <img
                            src={evt.image || DefaultImg}
                            alt={evt.title}
                            className="h-40 w-full object-cover rounded-xl"
                            onError={(e) => {
                                e.currentTarget.src = DefaultImg;
                            }}
                        />
                    </div>
                    <div className="absolute -bottom-1 -left-1 bg-yellow-400 text-xs font-bold text-gray-900 px-3 py-2 rounded-full border shadow-[5px_5px_0_#4c1d95] z-10">
                        {evt.start_date}
                    </div>
                </div>

                <div className="text-left flex-1 pt-3 px-2">
                    <h3 className="text-md font-semibold line-clamp-2 min-h-[50px]">
                        <a className="inline bg-[linear-gradient(black,black),linear-gradient(black,black)] dark:bg-[linear-gradient(white,white),linear-gradient(white,white)]
                        bg-[length:0%_2px,0_2px]
                        bg-[position:100%_100%,0_100%]
                        bg-no-repeat
                        transition-[background-size] duration-900
                        hover:bg-[length:0_2px,100%_2px]">
                            {evt.title}
                        </a>
                    </h3>

                    <div className="flex items-center gap-1 text-gray-500 text-xs mt-3 dark:text-white">
                        {evt.is_online ? (
                            <>
                                <HiOutlineGlobeAlt size={20} className="text-purple-600" />
                                <span className="truncate hover:text-yellow-500">
                                    {evt.map_link || "Online Event"}
                                </span>
                            </>
                        ) : (
                            <>
                                <HiOutlineLocationMarker size={20} className="text-purple-600" />
                                <span className="truncate hover:text-yellow-500">
                                    {evt.location}
                                </span>
                            </>
                        )}
                    </div>

                    <span
                        className={`mt-2 inline-block text-xs font-semibold px-2 py-0.5 rounded-md ${evt.is_online ? "bg-green-500 text-white" : "bg-red-500 text-white"
                            }`}
                    >
                        {evt.is_online ? "Online" : "Offline"}
                    </span>
                </div>

                <div className="border-t border-gray-200 pt-4 text-[10px] text-gray-500 pb-1 dark:text-white">
                    <div className="flex justify-between items-center w-full overflow-hidden">
                        <span className="flex items-center gap-1">
                            <HiOutlineUsers size={15} />
                            <span className="truncate">Sisa Kuota: {evt.capacity_left ?? 0}</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <HiOutlineClock size={15} />
                            <span className="truncate">
                                {new Date(evt.start_date) > new Date()
                                    ? `${evt.start_in}`
                                    : new Date(evt.end_date) > new Date()
                                        ? "Berlangsung"
                                        : "Selesai"}
                            </span>
                        </span>
                    </div>
                </div>
            </Card>
        </Link>
    );

    /** --- Card untuk "Event Saya" (dashboard user) --- */
    const UserCard = () => (
        <Link to={`/event/${evt.slug}`}>
             <Card className="h-full card-shine relative flex flex-col justify-between border rounded-2xl shadow-sm hover:shadow-[8px_8px_0_#D3DAD9] hover:scale-[1.02] transition-all duration-300 cursor-pointer p-0 overflow-visible z-10 dark:bg-[#0D0D1A] dark:border-white dark:hover:border-purple-500 dark:shadow-[0_0_15px_rgba(128,90,213,0.2)] dark:hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                <div className="relative -mt-1 -mx-1">
                    <div className="shine__animate">
                        <img
                            src={evt.image || DefaultImg}
                            alt={evt.title}
                            className="h-40 w-full object-cover rounded-xl"
                            onError={(e) => {
                                e.currentTarget.src = DefaultImg;
                            }}
                        />
                    </div>
                    <div className="absolute -bottom-1 -left-1 bg-yellow-400 text-xs font-bold text-gray-900 px-3 py-2 rounded-full border shadow-[5px_5px_0_#4c1d95] z-10">
                        {evt.start_date}
                    </div>
                </div>

                <div className="text-left flex-1 pt-3 px-2">
                    <h3 className="text-md font-semibold line-clamp-2 min-h-[50px]">
                        <a className="inline bg-[linear-gradient(black,black),linear-gradient(black,black)] dark:bg-[linear-gradient(white,white),linear-gradient(white,white)]
                        bg-[length:0%_2px,0_2px]
                        bg-[position:100%_100%,0_100%]
                        bg-no-repeat
                        transition-[background-size] duration-900
                        hover:bg-[length:0_2px,100%_2px]">
                            {evt.title}
                        </a>
                    </h3>
                </div>

                <div className="border-t border-gray-200 pt-4 text-[10px] text-gray-500 pb-1">
                    <div className="flex items-center gap-2 text-gray-600 text-xs mb-3 dark:text-white">
                        {evt.is_online ? (
                            <>
                                <HiOutlineGlobeAlt size={16} className="text-purple-600" />
                                <span>{evt.is_online ? "Online" : "Offline"}</span>
                            </>
                        ) : (
                            <>
                                <HiOutlineLocationMarker size={16} className="text-purple-600" />
                                <span>{evt.is_online ? "Online" : "Offline"}</span>
                            </>
                        )}
                        <span className="ml-auto text-gray-500 dark:text-white">
                            {evt.relativeTime}
                        </span>

                    </div>
                    <div className="flex justify-between items-center gap-2 mt-2">
                        {renderButtons()}

                        {event.status === "canceled" && (
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setOpenReasonModal(true);
                                }}
                                className="p-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-all"
                                title="Lihat alasan pembatalan"
                            >
                                <BiSolidCommentDetail size={20} />
                            </button>
                        )}

                        <Link
                            to={`/event/${evt.slug}`}
                            className="p-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all"
                        >
                            <HiOutlineEye size={20} />
                        </Link>
                    </div>
                </div>
            </Card>
        </Link>
    );

    return (
        <>
            {variant === "default" ? <DefaultCard /> : <UserCard />}

            {/* Modal Alasan Pembatalan */}
            <AnimatePresence>
                {openReasonModal && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-10 sm:px-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-white rounded-2xl shadow-lg text-start w-full max-w-2xl p-6 relative dark:bg-[#0D0D1A] max-h-[90vh] overflow-y-auto"
                        >
                            <h2 className="text-lg font-bold mb-4">
                                Pengajuan Event
                            </h2>

                            <div className="flex items-start gap-3 mb-5">
                                <img
                                    src={evt.image || DefaultImg}
                                    alt={evt.title}
                                    className="h-50 w-70 object-cover rounded-xl flex-shrink-0"
                                    onError={(e) => {
                                        e.currentTarget.src = DefaultImg;
                                    }}
                                />
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <p className="text-xs text-black px-2 py-0.5 rounded-md inline-block bg-amber-300">{evt.start_date}</p>
                                        <div className="flex items-center gap-1 text-xs">
                                            {evt.is_online ? (
                                                <>
                                                    <HiOutlineGlobeAlt size={16} className="text-purple-600" />
                                                    <span className="text-gray-700 dark:text-gray-200">Online</span>
                                                </>
                                            ) : (
                                                <>
                                                    <HiOutlineLocationMarker size={16} className="text-purple-600" />
                                                    <span className="text-gray-700 dark:text-gray-200">Offline</span>
                                                </>
                                            )}
                                        </div>

                                    </div>

                                    <p className="font-semibold">{evt.title}</p>
                                    <p className="text-xs line-clamp-10 " dangerouslySetInnerHTML={{ __html: evt.description }}></p>
                                </div>
                            </div>

                            <label className="block mb-2 text-sm font-medium">Alasan</label>
                            <textarea
                                className="w-full min-h-[120px] rounded-md p-3 text-sm text-gray-700 bg-gray-100 resize-none dark:bg-[#141427] dark:text-white"
                                readOnly
                                value={event.reason || "Tidak ada alasan"}
                            />


                            <div className="flex items-center gap-2 mt-4">
                                <span className="text-md text-purple-500">
                                    Tanggal Pengajuan : {event.created_at}
                                </span>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setOpenReasonModal(false)}
                                    className="px-5 py-3 text-sm rounded-full bg-purple-600 text-white font-semibold hover:text-black hover:bg-amber-300 transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                                        hover:shadow-none active:translate-y-0.5"
                                >
                                    Tutup
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal Pembatalan */}
            <AnimatePresence>
                {openModal && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-10 sm:px-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-white rounded-2xl shadow-lg text-start w-full max-w-2xl p-6 relative dark:bg-[#0D0D1A] max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setOpenModal(false)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            >
                                <HiOutlineX size={20} />
                            </button>

                            <h2 className="text-lg font-bold mb-4">
                                Pembatalan Pendaftaran Event
                            </h2>

                            <div className="flex items-start gap-3 mb-5">
                                <img
                                    src={evt.image || DefaultImg}
                                    alt={evt.title}
                                    className="h-50 w-70 rounded-xl object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = DefaultImg;
                                    }}
                                />
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <p className="text-xs text-black px-2 py-0.5 rounded-md inline-block bg-amber-300">{evt.start_date}</p>
                                        <div className="flex items-center gap-1 text-xs">
                                            {evt.is_online ? (
                                                <>
                                                    <HiOutlineGlobeAlt size={16} className="text-purple-600" />
                                                    <span className="text-gray-700 dark:text-gray-200">Online</span>
                                                </>
                                            ) : (
                                                <>
                                                    <HiOutlineLocationMarker size={16} className="text-purple-600" />
                                                    <span className="text-gray-700 dark:text-gray-200">Offline</span>
                                                </>
                                            )}
                                        </div>

                                    </div>

                                    <p className="font-semibold">{evt.title}</p>
                                    <p className="text-xs" dangerouslySetInnerHTML={{ __html: evt.description }}></p>
                                </div>
                            </div>

                            <label className="block mb-2 text-sm font-medium">Alasan</label>
                            <textarea
                                className="w-full border rounded-md p-2 text-sm dark:bg-[#141427] dark:text-white"
                                rows={3}
                                placeholder="Tuliskan alasan pembatalan"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />

                            <div className="flex items-center gap-2 mt-4">
                                <input
                                    className="accent-purple-600 w-4 h-4"
                                    type="checkbox"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                />
                                <span className="text-sm">
                                    Saya Setuju dengan persetujuan tersebut
                                </span>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="px-5 py-3 text-sm rounded-full bg-purple-500 text-white font-semibold hover:text-black hover:bg-amber-300 transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                                            hover:shadow-none active:translate-y-0.5"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleSubmitCancel}
                                    disabled={!reason.trim() || !agree}
                                    className="px-5 py-3 text-sm rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                                            hover:shadow-none active:translate-y-0.5"
                                >
                                    Ajukan
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default CardEvent;
