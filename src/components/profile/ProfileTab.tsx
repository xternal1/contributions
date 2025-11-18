import React from "react";
import { FaCamera } from "react-icons/fa";
import type { ProfilData } from "@features/user/models";
import noProfile from "@assets/img/no-image/no-profile.jpeg";
import noImage from "@assets/img/no-image/no-image.jpg";

interface ProfileTabProps {
    profile: ProfilData | null;
    form: {
        name: string;
        email: string;
        phone_number: string;
        address: string;
        gender: string;
    };
    setForm: (partial: Partial<ProfileTabProps["form"]>) => void;
    photoPreview: string;
    bannerPreview: string;
    photoInputRef: React.RefObject<HTMLInputElement | null>;
    bannerInputRef: React.RefObject<HTMLInputElement | null>;
    setPhotoFile: (file: File | null) => void;
    setBannerFile: (file: File | null) => void;
    handleUpdateProfile: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
    profile,
    form,
    setForm,
    photoPreview,
    bannerPreview,
    photoInputRef,
    bannerInputRef,
    setPhotoFile,
    setBannerFile,
    handleUpdateProfile,
}) => {
    return (
        <div>
            {/* Banner and Profile Photo Section */}
            <div className="relative h-45 rounded-lg mb-10 overflow-hidden">
                <img
                    src={bannerPreview || profile?.banner || noImage}
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
                        src={photoPreview || profile?.photo || noProfile}
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
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setPhotoFile(file);
                            }
                        }}
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
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setBannerFile(file);
                        }
                    }}
                />
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start text-xs">
                <div>
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Nama</label>
                    <input
                        type="text"
                        className="w-full border-2 border-purple-200 hover:border-purple-500 
                            focus:border-purple-600 focus:outline-none rounded-md p-3 "
                        value={form.name}
                        onChange={(e) => setForm({ name: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Email</label>
                    <input
                        type="email"
                        className="w-full border-2 border-purple-200 hover:border-purple-500 
                            focus:border-purple-600 focus:outline-none rounded-md p-3"
                        value={form.email}
                        onChange={(e) => setForm({ email: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Phone Number</label>
                    <input
                        type="text"
                        className="w-full border-2 border-purple-200 hover:border-purple-500 
                            focus:border-purple-600 focus:outline-none rounded-md p-3"
                        value={form.phone_number}
                        placeholder="Nomor Telepon"
                        onChange={(e) => setForm({ phone_number: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Gender</label>
                    <select
                        className="w-full border-2 border-purple-200 hover:border-purple-500 
                            focus:border-purple-600 focus:outline-none rounded-md p-3 bg-white dark:bg-[#0D0D1A] transition-colors duration-500"
                        value={form.gender}
                        onChange={(e) => setForm({ gender: e.target.value })}
                    >
                        <option value="" className="text-gray-400 border-b border-gray-300">
                            -- Pilih Gender --
                        </option>
                        <option value="laki-laki" className="text-gray-700 border-b border-gray-300">
                            Laki-laki
                        </option>
                        <option value="perempuan" className="text-gray-700 border-b border-gray-300">
                            Perempuan
                        </option>
                    </select>
                </div>

                {/* Alamat */}
                <div className="md:col-span-2">
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Alamat</label>
                    <textarea
                        rows={4}
                        className="w-full border-2 border-purple-200 hover:border-purple-500 
                            focus:border-purple-600 focus:outline-none rounded-md p-3 resize-none"
                        value={form.address}
                        placeholder="Alamat"
                        onChange={(e) => setForm({ address: e.target.value })}
                    ></textarea>
                </div>
            </div>

            <div className="flex justify-start mt-6">
                <button
                    onClick={handleUpdateProfile}
                    className="transition-all duration-500 ease-out shadow-[4px_4px_0px_0px_#0B1367]
                        hover:shadow-none active:translate-y-0.5 bg-purple-500 text-white font-bold text-xs 
                        px-6 py-3 rounded-full hover:text-black hover:bg-yellow-400"
                >
                    Update Info
                </button>
            </div>
        </div>
    );
};

export default ProfileTab;