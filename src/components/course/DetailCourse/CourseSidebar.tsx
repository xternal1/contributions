import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import certificateIcon from "../../../../public/images/icon/course_icon05.svg";
import {
  FaTag,
  FaBook,
  FaQuestionCircle,
  FaInfinity,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

// =========================
// Data: Logo Pembayaran
// =========================
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

// =========================
// Props
// =========================
interface Props {
  totalModul: number;
  totalKuis: number;
  price: number;
  isFree?: boolean;
}

// =========================
// Komponen Utama
// =========================
export default function CourseSidebar({ totalModul, totalKuis, price, isFree }: Props) {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [open, setOpen] = useState(false);

  // Format harga ke Rupiah
  const formatRupiah = (value: string | number) => {
    if (typeof value === "string") {
      value = value.replace(/\./g, "");
    }
    return Number(value).toLocaleString("id-ID");
  };

  // Aksi ketika tombol "Beli Sekarang" ditekan
  const handleBuyNow = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
    } else {
      const slug = window.location.pathname.split("/").pop() || "";

      navigate(`/transaction/course/${slug}`, {
        state: {
          course: {
            price,
            isFree,
            id: slug || "",
            title: document.title,
          },
        },
      });
    }
  };


  // =========================
  // Konten Sidebar
  // =========================
  const SidebarContent = (
    <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-gray-300 w-full lg:max-w-2xs mx-auto">

      {/* === Harga Kursus === */}
      <div className="bg-purple-600 border border-purple-500 rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
        <div className="flex items-left gap-2 font-semibold text-white text-[15px]">
          <FaTag size={15} /> <span>Harga Kursus</span>
        </div>
        <p className="mt-2 text-left font-bold text-[25px] text-white">
          {isFree ? "Gratis" : `Rp ${formatRupiah(price)}`}
        </p>
      </div>

      {/* === Tombol Beli === */}
      <button
        onClick={() => {
          if (isFree) {
            // 👉 kalau gratis langsung arahkan ke halaman kursus
            navigate(`/course/pre-tes/${slug}`);
          } else {
            // 👉 kalau berbayar jalankan logika beli
            handleBuyNow();
          }
        }}
        className="my-6 w-full relative group overflow-hidden text-black font-sans font-semibold text-sm py-2.5 px-4
  rounded-full flex items-center justify-center gap-2 border border-black transition-all duration-500
  ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)]
  active:translate-y-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:text-white"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        <span className="relative z-10 text-[14px]">
          {isFree ? "Mulai Belajar →" : "Beli Sekarang →"}
        </span>
      </button>

      {/* === Info Kursus === */}
      <div className="pt-3 pb-3">
        <h4 className="text-left font-semibold text-black text-[15px]">Kursus ini mencakup</h4>
        <ul className="mt-5 space-y-4 text-gray-600 text-[12px]">
          <li className="flex items-center gap-3 border-b border-gray-300 pb-4">
            <FaBook /> <span>{totalModul} Modul</span>
          </li>
          <li className="flex items-center gap-3 border-b border-gray-300 pb-4">
            <FaQuestionCircle /> <span>{totalKuis} Kuis</span>
          </li>
          <li className="flex items-center gap-3 border-b border-gray-300 pb-4">
            <FaInfinity /> <span>Akses penuh seumur hidup</span>
          </li>
          <li className="flex items-center gap-3 border-b border-gray-300 pb-4">
            <img src={certificateIcon} alt="Sertifikat" className="w-5 h-5 opacity-80" />
            <span>Sertifikat penyelesaian</span>
          </li>
        </ul>
      </div>

      {/* === Metode Pembayaran === */}
      <div className="border-b border-gray-300 pb-5">
        <p className="mb-4 text-left font-semibold text-[15px] ">Metode Pembayaran </p>
        <div className="flex flex-wrap justify-left gap-2">
          {paymentLogos.map((logo) => (
            <div
              key={logo.name}
              className="border border-gray-200 rounded-lg p-1 flex items-center justify-center w-12 h-10
                         transition-transform duration-300 hover:scale-110 hover:shadow-md hover:border-purple-400"
            >
              <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* === Bagikan Kursus === */}
      <div className="mt-4 border-b border-gray-300 pb-5">
        <p className="mb-4 text-left font-semibold text-[15px]">Bagikan Kursus Ini</p>
        <div className="flex gap-3">
          {[
            { icon: <FaFacebookF />, color: "hover:bg-blue-200 hover:text-blue-600", url: "https://facebook.com/sharer/sharer.php?u=https://contoh.com" },
            { icon: <FaTwitter />, color: "hover:bg-sky-200 hover:text-sky-500", url: "https://twitter.com/intent/tweet?url=https://contoh.com&text=Ikut%20Kursus%20Ini!" },
            { icon: <FaWhatsapp />, color: "hover:bg-green-200 hover:text-green-500", url: "https://wa.me/?text=Ikut%20Kursus%20Ini%20https://contoh.com" },
            { icon: <FaInstagram />, color: "hover:bg-pink-200 hover:text-pink-500", url: "https://instagram.com" },
            { icon: <FaYoutube />, color: "hover:bg-red-200 hover:text-red-500", url: "https://youtube.com" },
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
    </div>
  );

  // =========================
  // Return (Desktop + Mobile)
  // =========================
  return (
    <>
      {/* === Desktop (Sticky Sidebar) === */}
      <div className="hidden lg:block sticky top-6 self-start">{SidebarContent}</div>

      {/* === Mobile (Tombol Drawer) === */}
      <div className="fixed bottom-5 right-5 z-40 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="bg-purple-600 text-white px-5 py-3 rounded-full shadow-lg font-semibold"
        >
          Lihat Detail Kursus
        </button>
      </div>

      {/* === Mobile (Drawer Sidebar) === */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div onClick={() => setOpen(false)} className="flex-1 bg-black/40"></div>

          {/* Drawer */}
          <div className="w-full sm:w-96 h-full bg-white shadow-xl animate-slideInRight flex flex-col">

            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
              >
                ✕ Tutup
              </button>
            </div>

            {/* Konten Scrollable */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-5">
              {SidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
