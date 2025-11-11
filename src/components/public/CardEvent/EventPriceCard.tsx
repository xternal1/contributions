import { FiExternalLink } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaYoutube, FaTag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Eventype } from "../../../features/event/_event";
import { fetchProfile } from "../../../features/user/user_service";
import type { ProfilData, EventActivity } from "../../../features/user/models";

import noProfile from "../../../assets/img/no-image/no-profile.jpeg";

// =========================
// Data: Logo Pembayaran
// =========================
import BRI from "../../../../public/images/payments/bri.png";
import BNI from "../../../../public/images/payments/bni.png";
import BCA from "../../../../public/images/payments/bca.png";
import DANA from "../../../../public/images/payments/dana.jpg";
import GOPAY from "../../../../public/images/payments/gopay.png";
import Mandiri from "../../../../public/images/payments/mandiri.png";
import OVO from "../../../../public/images/payments/ovo.png";
import VISA from "../../../../public/images/payments/visa.png";
import Mastercard from "../../../../public/images/payments/mastercard.jpeg";
import Alfamart from "../../../../public/images/payments/alfamart.jpg";
import Indomaret from "../../../../public/images/payments/indomaret.jpg";
import BJB from "../../../../public/images/payments/bank bjb.png";
import AstraPay from "../../../../public/images/payments/astra pay.jpeg";
import BSI from "../../../../public/images/payments/bnk bsi.jpg";
import JCB from "../../../../public/images/payments/jcb.jpeg";
import LinkAja from "../../../../public/images/payments/link aja.jpg";
import PermataBank from "../../../../public/images/payments/permata bank.jpg";
import ShopeePay from "../../../../public/images/payments/shopeepay.jpg";
import QRIS from "../../../../public/images/payments/qris.jpg";

// =========================
// Daftar Logo Pembayaran
// =========================
const paymentLogos = [
  { name: "BRI", src: BRI },
  { name: "BNI", src: BNI },
  { name: "BCA", src: BCA },
  { name: "DANA", src: DANA },
  { name: "GOPAY", src: GOPAY },
  { name: "Mandiri", src: Mandiri },
  { name: "OVO", src: OVO },
  { name: "VISA", src: VISA },
  { name: "Mastercard", src: Mastercard },
  { name: "Alfamart", src: Alfamart },
  { name: "Indomaret", src: Indomaret },
  { name: "BJB", src: BJB },
  { name: "Astra Pay", src: AstraPay },
  { name: "BSI", src: BSI },
  { name: "JCB", src: JCB },
  { name: "Link Aja", src: LinkAja },
  { name: "Permata Bank", src: PermataBank },
  { name: "Shopee Pay", src: ShopeePay },
  { name: "QRIS", src: QRIS },
];

const EventPriceCard: React.FC<{ event: Eventype; eventIsOver: boolean }> = ({
  event,
  eventIsOver,
}) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<ProfilData | null>(null);
  const [userEventStatus, setUserEventStatus] = useState<EventActivity | null>(null);

  // Fetch user profile dan cek status event
  useEffect(() => {
    const checkUserEventStatus = async () => {
      try {
        const user = await fetchProfile();
        setCurrentUser(user);

        if (user && user.event_activities) {
          const userEvent = user.event_activities.find(
            (activity: EventActivity) => activity.event.id === event.id
          );
          setUserEventStatus(userEvent || null);
        }
      } catch (error) {
        console.error("Gagal memeriksa status event user:", error);
      }
    };

    checkUserEventStatus();
  }, [event.id]);

  const handleJoinEvent = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(`/event/${event.id}/payment`);
    }
  };

  const handleViewCertificate = () => {
    navigate(`/events/certificate/${event.slug}`);
  };

  // Fungsi untuk menentukan apakah user sudah mengikuti event
  const hasJoinedEvent = () => {
    if (!userEventStatus) return false;
    return userEventStatus.status === "accepted";
  };

  // Format tanggal seperti gambar (12 Sep 2024)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Render tombol untuk yang sudah join event (sertifikat)
  const renderCertificateButton = () => {
    // Jika user sudah mengikuti event
    if (hasJoinedEvent()) {
      return (
        <div className="space-y-3 my-6">
          {/* Tombol Unduh Sertifikat */}
          <button
            onClick={handleViewCertificate}
            className="w-full relative group overflow-hidden font-sans font-semibold text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-2 border border-purple-600 bg-white text-purple-600 transition-all duration-500 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 hover:bg-purple-600 hover:text-white dark:bg-[#0D0D1A] dark:hover:bg-purple-600"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10">Unduh Sertifikat →</span>
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-gray-300 w-full lg:max-w-2xs mx-auto dark:bg-[#0D0D1A] transition-colors duration-500">
      
      {/* === Harga Event / Statistik Peserta === */}
      {hasJoinedEvent() ? (
        <div className="text-center">
          <h4 className="font-semibold text-gray-800 text-mb mb-4 text-left dark:text-white">Statistik Peserta:</h4>

          {/* Photo Profile */}
          <div className="flex justify-center mb-2">
            <img
              src={
                currentUser?.photo
                  ? currentUser.photo.startsWith("http")
                    ? currentUser.photo
                    : `${import.meta.env.VITE_API_URL}/storage/${currentUser.photo}`
                  : noProfile
              }
              alt={currentUser?.name || "User"}
              className="w-20 h-20 rounded-full border-2 border-purple-600 object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.onerror = null;
                target.src = noProfile;
              }}
            />
          </div>

          {/* Nama */}
          <div className="text-gray-800 font-semibold text-md dark:text-white mb-3">
            {currentUser?.name || "User"}
          </div>

          {/* Status event */}
          <div className="bg-purple-600 rounded-md text-start py-4 px-5 text-white font-medium shadow">
            <p className="text-sm">Event</p>
            <p className="text-[25px] font-bold">
              {hasJoinedEvent() ? "Selesai" : "Belum Selesai"}
            </p>
          </div>

          {/* Tanggal beli */}
          <div className="mt-4 text-xs text-gray-600 border-t pt-3 flex justify-between items-center dark:text-white dark:border-white">
            <p className="font-medium">Dibeli</p>
            <span className="font-semibold text-gray-800 dark:text-white">
              {"-"}
            </span>
          </div>

          {/* Tanggal selesai */}
          <div className="mt-4 text-xs text-gray-600 border-t pt-3 flex justify-between items-center dark:text-white dark:border-white">
            <p className="font-medium">Selesai</p>
            <span className="font-semibold text-gray-800 dark:text-white">
              {hasJoinedEvent() ? formatDate(event.end_date_raw) : "-"}
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-purple-600 border border-purple-500 rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div className="flex items-left gap-2 font-semibold text-white text-[15px]">
            <FaTag size={15} /> <span>Harga Event</span>
          </div>
          <p className="mt-2 text-left font-bold text-[25px] text-white">
            {event.price === 0 ? "Gratis" : `Rp ${event.price.toLocaleString("id-ID")}`}
          </p>
        </div>
      )}

      {/* Tombol Sertifikat */}
      {renderCertificateButton()}

      {/* === Info Event === */}
      <div className="pt-3 pb-3">
        <h4 className="text-left font-semibold text-black text-[15px] dark:text-white">Event ini mencakup</h4>
        <ul className="mt-5 space-y-4 text-gray-600 text-[12px] dark:text-white">
          <li className="flex items-center gap-3 border-b border-gray-300 pb-4">
            <span className="font-medium">Tanggal Mulai</span>
            <span className="ml-auto font-semibold">{formatDate(event.start_date_raw)}</span>
          </li>
          <li className="flex items-center gap-3 border-b border-gray-300 pb-4">
            <span className="font-medium">Waktu Mulai</span>
            <span className="ml-auto font-semibold">{event.start_hour} WIB</span>
          </li>
          <li className="flex items-center gap-3 border-b border-gray-300 pb-4">
            <span className="font-medium">Sertifikat</span>
            <span className="ml-auto font-semibold">{event.has_certificate ? "Include" : "Tidak Include"}</span>
          </li>
          <li className="flex items-center gap-3 border-b border-gray-300 pb-4">
            <span className="font-medium">Sisa Peserta</span>
            <span className="ml-auto font-semibold">{event.capacity_left}/{event.capacity}</span>
          </li>
        </ul>
      </div>

      {/* === Lokasi/Platform === */}
      <div className="border-b border-gray-300 pb-5">
        <p className="mb-4 text-left font-semibold text-[15px]">
          {event.is_online === 1 ? "Platform" : "Lokasi"}
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            {event.is_online === 1 ? (
              <>
                LIVE at{" "}
                <a
                  href={event.map_link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:underline inline-flex items-center gap-1"
                >
                  {event.location ?? "YouTube"}
                  <FiExternalLink size={15} className="text-purple-500" />
                </a>
              </>
            ) : (
              <>
                Lokasi:{" "}
                <a
                  href={event.map_link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:underline inline-flex items-center gap-1"
                >
                  <span className="truncate">{event.location ?? "Lihat Lokasi"}</span>
                  <FiExternalLink size={15} className="text-purple-500" />
                </a>
              </>
            )}
          </p>
          <p className="text-gray-500 font-semibold dark:text-white">
            {event.is_online === 1 ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* === Metode Pembayaran === */}
      {!hasJoinedEvent() && !eventIsOver && (
        <div className="border-b border-gray-300 pb-5">
          <p className="mb-4 text-left font-semibold text-[15px]">Metode Pembayaran</p>
          <div className="flex flex-wrap justify-left gap-2">
            {paymentLogos.map((logo) => (
              <div
                key={logo.name}
                className="border border-gray-200 rounded-lg p-1 flex items-center justify-center w-12 h-10
                         transition-transform duration-300 hover:scale-110 hover:shadow-md hover:border-purple-400 dark:bg-white"
              >
                <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === Bagikan Event === */}
      <div className="mt-4 border-b border-gray-300 pb-5">
        <p className="mb-4 text-left font-semibold text-[15px]">Bagikan Event Ini</p>
        <div className="flex gap-3">
          {[
            { icon: <FaFacebookF />, color: "hover:bg-blue-200 hover:text-blue-600", url: "https://facebook.com/sharer/sharer.php?u=https://contoh.com" },
            { icon: <FaTwitter />, color: "hover:bg-sky-200 hover:text-sky-500", url: "https://twitter.com/intent/tweet?url=https://contoh.com&text=Ikut%20Event%20Ini!" },
            { icon: <FaWhatsapp />, color: "hover:bg-green-200 hover:text-green-500", url: "https://wa.me/?text=Ikut%20Event%20Ini%20https://contoh.com" },
            { icon: <FaInstagram />, color: "hover:bg-pink-200 hover:text-pink-500", url: "https://instagram.com" },
            { icon: <FaYoutube />, color: "hover:bg-red-200 hover:text-red-500", url: "https://youtube.com" },
          ].map((item, index) => (
            <a
              key={index}
              href={item.url}
              rel="noopener noreferrer"
              className={`bg-gray-200 p-2 rounded-full text-gray-400 text-lg dark:bg-[#2C004F] dark:text-white
                          transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-md ${item.color}`}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>

      {/* === Tombol Ikuti Event - DITEMPATKAN DI BAWAH === */}
      {!hasJoinedEvent() && !eventIsOver && (
        <div className="mt-6">
          <button
            onClick={handleJoinEvent}
            className="w-full relative group overflow-hidden text-black font-sans font-semibold text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-2 border border-black transition-all duration-500 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:text-white"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10 text-[14px]">
              Ikuti Event →
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EventPriceCard;