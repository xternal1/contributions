// src/components/user/Profile/ProfileBanner.tsx
import { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import noProfile from "../../assets/img/no-image/no-profile.jpeg";
import noImage from "../../assets/img/no-image/no-image.jpg";

interface ProfileBannerProps {
    bannerPreview: string | null;
    bannerUrl?: string | null;
    photoPreview: string | null;
    photoUrl?: string | null;
    onPhotoChange: (file: File, preview: string) => void;
    onBannerChange: (file: File, preview: string) => void;
}

const ProfileBanner = ({
    bannerPreview,
    bannerUrl,
    photoPreview,
    photoUrl,
    onPhotoChange,
    onBannerChange,
}: ProfileBannerProps) => {
    const photoInputRef = useRef<HTMLInputElement | null>(null);
    const bannerInputRef = useRef<HTMLInputElement | null>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            onPhotoChange(file, preview);
        }
    };

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            onBannerChange(file, preview);
        }
    };

    return (
        <div className="relative h-45 rounded-lg mb-10 overflow-hidden">
            <img
                src={bannerPreview || bannerUrl || noImage}
                alt="cover"
                className="w-full h-60 object-cover"
                onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.onerror = null;
                    target.src = noImage;
                }}
            />

            <div className="absolute bottom-5 left-8 flex items-center space-x-4">
                {/* Foto Profil */}
                <img
                    src={photoPreview || photoUrl || noProfile}
                    alt="profile"
                    className="w-25 h-25 rounded-full border-7 border-white shadow-md object-cover bg-white"
                    onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.onerror = null;
                        target.src = noProfile;
                    }}
                />

                {/* Tombol Kamera */}
                <button
                    type="button"
                    className="absolute bottom-1 right-4 bg-white p-2 rounded-full shadow-md hover:bg-purple-600 group"
                    onClick={() => photoInputRef.current?.click()}
                >
                    <FaCamera size={15} className="text-purple-600 group-hover:text-white" />
                </button>

                <input
                    type="file"
                    ref={photoInputRef}
                    className="hidden"
                    accept="image/png, image/jpeg, image/webp, image/jpg, image/gif, image/avif"
                    onChange={handlePhotoChange}
                />
            </div>

            <button
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                className="absolute transition-all duration-500 ease-out shadow-[3px_3px_0px_0px_#0B1367]
                    hover:shadow-none active:translate-y-0.5 bottom-5 right-7 bg-yellow-400 text-black font-bold text-xs px-6 py-3 border-2 rounded-full hover:text-white hover:bg-purple-600"
            >
                Edit Cover Photo
            </button>

            <input
                type="file"
                ref={bannerInputRef}
                className="hidden"
                accept="image/png, image/jpeg, image/webp, image/jpg, image/gif, image/avif"
                onChange={handleBannerChange}
            />
        </div>
    );
};

export default ProfileBanner;


