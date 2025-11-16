// src/components/profile/ProfileForm.tsx

interface ProfileFormData {
    name: string;
    email: string;
    phone_number: string;
    gender: string;
    address: string;
}

interface ProfileFormProps {
    form: ProfileFormData;
    onFormChange: (field: string, value: string) => void;
    onSubmit: () => void;
}

const ProfileForm = ({ form, onFormChange, onSubmit }: ProfileFormProps) => {
    return (
        <div>
            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start text-xs">
                <div>
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Nama</label>
                    <input
                        type="text"
                        className="w-full border-2 border-purple-200 hover:border-purple-500 
                            focus:border-purple-600 focus:outline-none rounded-md p-3"
                        value={form.name}
                        onChange={(e) => onFormChange("name", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Email</label>
                    <input
                        type="email"
                        className="w-full border-2 border-purple-200 hover:border-purple-500 
                            focus:border-purple-600 focus:outline-none rounded-md p-3"
                        value={form.email}
                        onChange={(e) => onFormChange("email", e.target.value)}
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
                        onChange={(e) => onFormChange("phone_number", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2 dark:text-white">Gender</label>
                    <select
                        className="w-full border-2 border-purple-200 hover:border-purple-500 
                            focus:border-purple-600 focus:outline-none rounded-md p-3 bg-white dark:bg-[#0D0D1A] transition-colors duration-500"
                        value={form.gender}
                        onChange={(e) => onFormChange("gender", e.target.value)}
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
                        onChange={(e) => onFormChange("address", e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="flex justify-start mt-6">
                <button
                    onClick={onSubmit}
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

export default ProfileForm;