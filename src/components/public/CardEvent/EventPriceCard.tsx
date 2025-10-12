import { FiClock, FiArrowRight, FiExternalLink } from "react-icons/fi";
import { BsCalendar2Event, BsCalendar2X } from "react-icons/bs";
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { GraduationCap } from "lucide-react";
import { Card } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import type { Eventype } from "../../../features/event/_event";
import certificateIcon from "../../../../public/images/icon/course_icon05.svg";


// Daftar Logo Pembayaran
const paymentLogos = [
  { name: "BRI", src: "/public/images/payments/bri.png" },
  { name: "BNI", src: "/public/images/payments/bni.png" },
  { name: "BCA", src: "/public/images/payments/bca.png" },
  { name: "DANA", src: "/public/images/payments/dana.jpg" },
  { name: "GOPAY", src: "/public/images/payments/gopay.png" },
  { name: "Mandiri", src: "/public/images/payments/mandiri.png" },
  { name: "OVO", src: "/public/images/payments/ovo.png" },
  { name: "VISA", src: "/public/images/payments/visa.png" },
  { name: "Mastercard", src: "/public/images/payments/mastercard.jpeg" },
  { name: "Alfamart", src: "/public/images/payments/alfamart.jpg" },
  { name: "Indomaret", src: "/public/images/payments/indomaret.jpg" },
  { name: "BJB", src: "/public/images/payments/bank bjb.png" },
  { name: "Astra Pay", src: "/public/images/payments/astra pay.jpeg" },
  { name: "BSI", src: "/public/images/payments/bnk bsi.jpg" },
  { name: "JCB", src: "/public/images/payments/jcb.jpeg" },
  { name: "Link Aja", src: "/public/images/payments/link aja.jpg" },
  { name: "Permata Bank", src: "/public/images/payments/permata bank.jpg" },
  { name: "Shopee Pay", src: "/public/images/payments/shopee pay.jpg" },
  { name: "QRIS", src: "/public/images/payments/qris.jpg" },
];


const EventPriceCard: React.FC<{ event: Eventype; eventIsOver: boolean }> = ({
  event,
  eventIsOver,
}) => {

  const navigate = useNavigate();

  const handleJoinEvent = () => {
    const isLoggedIn = localStorage.getItem("authToken");
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate(`/event/${event.id}/payment`);
    }
  };

  return (
    <Card className="shadow-lg border border-gray-200 overflow-hidden z-10 rounded-2xl">
      {/* Header Harga */}
      <div className="bg-purple-600 text-white px-6 rounded-xl shadow-2xl py-5">
        <p className="text-sm">Harga Masuk</p>
        <p className="text-2xl font-bold">
          {event.price === 0 ? "Gratis" : `Rp ${event.price.toLocaleString("id-ID")}`}
        </p>
      </div>

      {/* Isi Konten */}
      <div className="p-5 space-y-5 text-sm text-gray-700">
        {/* Informasi Event */}
        <div>
          <h1 className="text-lg font-semibold mb-3">Informasi Event :</h1>
          <div className="space-y-3">
            {/* Tanggal */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div className="flex items-center gap-2">
                <BsCalendar2Event size={20} className="text-gray-600" />
                <span className="font-medium">Tanggal Mulai</span>
              </div>
              <span>
                {new Date(event.start_date_raw).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div className="flex items-center gap-2">
                <BsCalendar2X size={20} className="text-gray-600" />
                <span className="font-medium">Tanggal Berakhir</span>
              </div>
              <span>
                {new Date(event.end_date_raw).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Waktu */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div className="flex items-center gap-2">
                <FiClock size={20} className="text-gray-600" />
                <span className="font-medium">Waktu Mulai</span>
              </div>
              <span>{event.start_hour} WIB</span>
            </div>

            {/* Sertifikat */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div className="flex items-center gap-2">
                <img src={certificateIcon} alt="Sertifikat" className="w-5 h-5 opacity-80" />
                <span className="font-medium">Sertifikat</span>
              </div>
              <span>{event.has_certificate ? "Online Certificate" : "Include"}</span>
            </div>

            {/* Kuota */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-2">
              <div className="flex items-center gap-2">
                <GraduationCap size={20} className="text-gray-600" />
                <span className="font-medium">Total Kuota</span>
              </div>
              <span>{event.capacity - event.capacity_left}/{event.capacity}</span>
            </div>
          </div>
        </div>

        {/* Platform/Lokasi */}
        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-lg font-semibold mb-3">
            {event.is_online === 1 ? "Platform :" : "Lokasi :"}
          </h1>

          <div className="flex flex-col gap-2">
            {event.is_online === 1 ? (
              // Jika Online → Tampilkan Platform
              <>
                <p className="text-sm text-gray-400">
                  LIVE at{" "}
                  <a
                    href={event.map_link ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:underline inline-flex items-center gap-1"
                  >
                    {/* Jika ada nama platform → tampilkan, jika tidak → fallback */}
                    {event.location ?? "YouTube"}
                    <FiExternalLink size={15} className=" text-purple-500" />
                  </a>
                </p>
                <p className="text-gray-500 font-semibold">Online</p>
              </>
            ) : (
              // Jika Offline → Tampilkan Lokasi
              <>
                <p className="text-sm text-gray-400">
                  Lokasi:{" "}
                  <a
                    href={event.map_link ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:underline inline-flex items-center gap-1"
                  >
                    <span className="truncate">{event.location ?? "Lihat Lokasi"}</span>
                    <FiExternalLink size={15} className=" text-purple-500 " />
                  </a>
                </p>
                <p className="text-gray-500 font-semibold">Offline</p>
              </>
            )}
          </div>
        </div>

        {/* Metode Pembayaran */}
        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-lg font-semibold mb-3">Metode Pembayaran :</h1>
          <div className="flex flex-wrap gap-2">
            {paymentLogos.map((logo) => (
              <div
                key={logo.name}
                className="border border-gray-200 rounded-lg p-1 flex items-center justify-center w-12 h-10 
                         transition-transform duration-300 hover:scale-110 hover:shadow-md hover:border-purple-400"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bagikan */}
        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-lg font-semibold mb-3">Bagikan Kursus Ini</h1>
          <div className="flex gap-3">
            {[
              {
                icon: <FaFacebookF />,
                color: "hover:bg-blue-200 hover:text-blue-600",
                url: "https://facebook.com/sharer/sharer.php?u=https://contoh.com",
              },
              {
                icon: <FaTwitter />,
                color: "hover:bg-sky-200 hover:text-sky-500",
                url: "https://twitter.com/intent/tweet?url=https://contoh.com&text=Ikut%20Kursus%20Ini!",
              },
              {
                icon: <FaWhatsapp />,
                color: "hover:bg-green-200 hover:text-green-500",
                url: "https://wa.me/?text=Ikut%20Kursus%20Ini%20https://contoh.com",
              },
              {
                icon: <FaInstagram />,
                color: "hover:bg-pink-200 hover:text-pink-500",
                url: "https://instagram.com",
              },
              {
                icon: <FaYoutube />,
                color: "hover:bg-red-200 hover:text-red-500",
                url: "https://youtube.com",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.url}
                rel="noopener noreferrer"
                className={`bg-gray-200 p-2 rounded-full text-gray-400 text-lg 
                          transition-all duration-300 hover:scale-110 hover:rotate-6 hover:shadow-md ${item.color}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Button Masuk */}
        {!eventIsOver && (
          <button
            onClick={handleJoinEvent}
            className="flex items-center justify-center gap-2 w-full bg-purple-600 shadow-[5px_7px_0_#4c1d95] 
                   text-white py-3 rounded-full hover:shadow hover:bg-yellow-400 hover:text-gray-950 
                   transition-all duration-300 font-semibold mt-2"
          >
            <span>Ikuti Event</span>
            <FiArrowRight className="text-lg" />
          </button>
        )}

      </div>
    </Card>
  );
};

export default EventPriceCard;