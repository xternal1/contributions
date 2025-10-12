import DashboardLayout from "../../../components/public/auth/DashboardLayout"

const CertificatePage = () => {
    return (
        <DashboardLayout slug="certificate">
             <main className="flex-1 bg-white ml-8 p-7 rounded-xl shadow-xl border-3 border-purple-200 ">
                {/* Aktivitas Belajar */}
                <section className="text-start">
                    <h2 className="text-xl font-bold">Daftar Sertifikat</h2>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <img className="w-80" src="/src/assets/img/no-data/empty.svg" alt="no-data" />
                        <p className="text-black text-xl font-bold">Data Kosong</p>
                    </div>
                </section> 
            </main>
        </DashboardLayout>
    )
}

export default CertificatePage