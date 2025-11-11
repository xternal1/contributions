import BackgroundShape from "../../../components/public/auth/Background Shape";
import Shape from "../../../components/public/auth/Shape";
import UpdateForm from "../../../forms/UpdateForm";

import fotomodel from '../../../assets/auth/fotomodel.png';
import logoGetskill from '../../../assets/img/logo/get-skill/landscape.png';

const UpdatePassword = () => {

    return (
        <div className="min-h-screen flex font-sans">
            {/* Bagian Kiri */}
            <div className="hidden 2xl:flex xl:flex lg:flex md:flex 2xl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-300 to-purple-500 p-10 2xl:p-0 xl:p-0 lg:p-0 md:p-0 mb:p-0 items-center justify-center">
                {/* Background Shape */}
                <BackgroundShape />

                {/* Konten Kiri */}
                <div className="relative bg-purple-300 px-80 2xl:px-80 xl:px-80 lg:px-65 md:px-40 py-75 2xl:py-75 xl:py-75 lg:py-65 md:py-60 rounded-3xl overflow-hidden">
                    <div className="absolute top-7 2xl:top-7 xl:top-7 lg:top-6 md:top-7 left-7 2xl:left-7 xl:left-7 lg:left-6 md:left-7 p-6 2xl:p-6 xl:p-6 lg:p-4 md:p-0  z-10 ">
                        <h1 className="text-4xl 2xl:text-4xl xl:text-4xl lg:text-3xl md:text-2xl text-white font-bold text-left leading-normal">
                            Tingkatkan <br />
                            Kemampuanmu Di <br />
                            <span className="text-purple-600 text-5xl font-bold mt-4 inline-block">GetSkill</span>
                            <div className="w-32 h-1 bg-purple-600 mt-2"></div>
                        </h1>

                    </div>

                    <div className="absolute top-80 2xl:top-80 xl:top-80 lg:top-70 md:top-80 left-0 z-10">
                        <img src={fotomodel} alt="fotomodel" className="w-70 2xl:w-70 xl:w-70 lg:w-60 md:w-40 h-auto" />
                    </div>

                    {/* Wrapper untuk shape & teks */}
                    <div className="relative">
                        {/* Shape */}
                        <Shape />
                    </div>
                    <div className="absolute top-95 2xl:top-95 xl:top-95 lg:top-80 md:top-70 left-85 2xl:left-85 xl:left-85 lg:left-70 md:left-45">
                        <p className=" text-white text-left font-medium z-10 text-1xl 2xl:text-1xl xl:text-1xl lg:text-sm md:text-xs max-w-xs">
                            Selamat Datang di GetSkill.id. <br />
                            Silakan masuk untuk <br />
                            mengakses kursus dan mulai <br />
                            tingkatkan keterampilan Anda <br />
                            hari ini!
                        </p>
                    </div>
                </div>
            </div>

            {/* Bagian Kanan */}
            <div className="relative flex-1 flex items-center justify-center p-6">
                <div className="w-full max-w-xl 2xl:max-w-xl xl:max-w-xl lg:max-w-md md:max-w-xs text-left">
                    {/* Logo */}
                    <div className="flex-1 items-center justify-center mb-6">
                        <img
                            src={logoGetskill}
                            alt="GetSkill Logo"
                            className="h-8 w-auto"
                        />
                    </div>

                    <h2 className="text-2xl font-bold mb-2">
                        Ubah Kata Sandi Anda
                    </h2>
                    <p className="text-gray-500 mb-6 text-sm dark:text-gray-300">
                        Lindungi akun Anda dengan kata sandi baru yang lebih aman. <br />
                        Ubah sekarang!
                    </p>

                    <UpdateForm />

                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
