import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import certificateIcon from "../../../../public/images/icon/course_icon05.svg";
import certificateIconWhite from "../../../../public/images/icon/course_icon05_white.svg";
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

import { fetchNavigate } from "../../../features/course/_service/course_service";
import type { DetailCourse } from "../../../features/course/_course";

import { fetchProfile } from "../../../features/user/user_service";
import type { ProfilData } from "../../../features/user/models";

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

// =========================
// Props
// =========================
interface Props {
  totalModul: number;
  totalKuis: number;
  price: number;
  isFree?: boolean;
  hasPretestDone?: boolean;
  hasPosttestDone?: boolean;
  courseData?: DetailCourse | null;
}

// =========================
// Komponen Utama
// =========================
export default function CourseSidebar({
  totalModul,
  totalKuis,
  price,
  isFree,
  hasPretestDone = false,
  hasPosttestDone = false,
  courseData,

}: Props) {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [open, setOpen] = useState(false);

  const [loadingModule, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isPurchased, setIsPurchased] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<ProfilData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchProfile();
        setCurrentUser(user);
      } catch {
        console.warn("Gagal ambil user login");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (courseData && courseData.user_course) {
      setIsPurchased(true);
      setPurchaseDate(
        new Date(courseData.user_course.created_at).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      );
    } else {
      setIsPurchased(false);
    }
  }, [courseData]);

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

  // Fungsi untuk melihat materi
  const handleViewMaterial = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchNavigate(slug!);
      if (!data?.sub_module?.slug) {
        setError("Modul belum tersedia atau belum siap.");
        return;
      }

      navigate(`/module/${data.sub_module.slug}`);
    } catch (err) {
      console.error("Gagal memulai modul:", err);
      setError("Gagal memulai modul.");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk mengunduh sertifikat
  const handleDownloadCertificate = () => {
    // Navigasi ke halaman sertifikat kursus
    navigate(`/courses/certificates/${slug}`);
  };

  const renderActionButton = () => {
    // Jika sudah selesai post-test - TAMPILKAN DUA TOMBOL
    if (hasPosttestDone) {
      return (
        <div className="space-y-3 my-6">
          {/* Tombol Lihat Materi */}
          <button
            onClick={handleViewMaterial}
            disabled={loadingModule}
            className={`w-full relative group overflow-hidden font-sans font-semibold text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-2 border transition-all duration-500 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 ${loadingModule
                ? "bg-gray-400 border-gray-400 cursor-not-allowed text-white"
                : "bg-white border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:bg-[#0D0D1A] dark:hover:bg-purple-600"
              }`}
          >
            {loadingModule ? (
              "Memuat..."
            ) : (
              <>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10">Lihat Materi →</span>
              </>
            )}
          </button>

          {/* Tombol Unduh Sertifikat */}
          <button
            onClick={handleDownloadCertificate}
            className="w-full relative group overflow-hidden font-sans font-semibold text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-2 border transition-all duration-500 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 bg-white border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:bg-[#0D0D1A] dark:hover:bg-purple-600"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10">Unduh Sertifikat →</span>
          </button>

          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </div>
      );
    }

    // Jika sudah selesai pre-test → lanjutkan ke modul
    if (hasPretestDone) {
      return (
        <>
          <button
            onClick={handleViewMaterial}
            disabled={loadingModule}
            className={`my-6 w-full relative group overflow-hidden font-sans font-semibold text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-2 border transition-all duration-500 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 ${loadingModule
                ? "bg-gray-400 border-gray-400 cursor-not-allowed text-white"
                : "bg-white border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:bg-[#0D0D1A] dark:hover:bg-purple-600"
              }`}
          >
            {loadingModule ? (
              "Memuat Modul..."
            ) : (
              <>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                <span className="relative z-10">Lanjutkan Belajar →</span>
              </>
            )}
          </button>

          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        </>
      );
    }

    // Jika belum selesai pre-test
    if (courseData?.user_course) {
      return (
        <button
          onClick={() => navigate(`/course/pre-tes/exam/${slug}`)}
          className="my-6 w-full relative group overflow-hidden font-sans font-semibold text-sm py-2.5 px-4 rounded-full flex items-center justify-center gap-2 border transition-all duration-500 ease-in-out shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 bg-white border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white dark:bg-[#0D0D1A] dark:hover:bg-purple-600"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
          <span className="relative z-10">Lanjutkan Pre-Test →</span>
        </button>
      );
    }

    // Belum mulai sama sekali
    return (
      <button
        onClick={() => {
          const token = localStorage.getItem("authToken");

          if (!token) {
            navigate("/login");
            return;
          }

          if (isFree) {
            navigate(`/course/pre-tes/${slug}`);
          } else {
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
    );
  };

  // =========================
  // Konten Sidebar
  // =========================
  const SidebarContent = (
    <div className="bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-gray-300 w-full lg:max-w-2xs mx-auto dark:bg-[#0D0D1A] transition-colors duration-500">

      {/* === Harga Kursus / Statistik Siswa === */}
      {isPurchased ? (
        <div className="text-center">
          <h4 className="font-semibold text-gray-800 text-mb mb-4 text-left dark:text-white">Statistik Siswa:</h4>

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

          {/* Status kursus */}
          <div className="bg-purple-600 rounded-md text-start py-4 px-5 text-white font-medium shadow">
            <p className="text-sm">Kursus:</p>
            <p className="text-sm font-bold">
              {hasPosttestDone ? "Sudah Selesai" : "Belum Selesai"}
            </p>
          </div>

          {/* Tanggal beli */}
          <div className="mt-4 text-xs text-gray-600 border-t pt-3 flex justify-between items-center dark:text-white dark:border-white">
            <p className="font-medium">Dibeli</p>
            <span className="font-semibold text-gray-800 dark:text-white">
              {purchaseDate || "-"}
            </span>
          </div>

          {/* Tanggal selesai */}
          <div className="mt-4 text-xs text-gray-600 border-t pt-3 flex justify-between items-center dark:text-white dark:border-white">
            <p className="font-medium">Selesai</p>
            <span className="font-semibold text-gray-800 dark:text-white">
              {"-"}
            </span>
          </div>

        </div>
      ) : (
        <div className="bg-purple-600 border border-purple-500 rounded-xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div className="flex items-left gap-2 font-semibold text-white text-[15px]">
            <FaTag size={15} /> <span>Harga Kursus</span>
          </div>
          <p className="mt-2 text-left font-bold text-[25px] text-white">
            {isFree ? "Gratis" : `Rp ${formatRupiah(price)}`}
          </p>
        </div>
      )}

      {renderActionButton()}

      {/* === Info Kursus === */}
      <div className="pt-3 pb-3">
        <h4 className="text-left font-semibold text-black text-[15px] dark:text-white">Kursus ini mencakup</h4>
        <ul className="mt-5 space-y-4 text-gray-600 text-[12px] dark:text-white">
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
            <img
              src={certificateIcon}
              alt="Sertifikat"
              className="w-5 h-5 opacity-80 dark:hidden"
            />

            {/* Dark Mode Icon */}
            <img
              src={certificateIconWhite}
              alt="Sertifikat"
              className="w-5 h-5 opacity-80 hidden dark:block"
            />
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
                         transition-transform duration-300 hover:scale-110 hover:shadow-md hover:border-purple-400 dark:bg-white"
            >
              <img src={logo.src} alt={logo.name} className="max-h-full max-w-full object-contain " />
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
              className={`bg-gray-200 p-2 rounded-full text-gray-400 text-lg dark:bg-[#2C004F] dark:text-white
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