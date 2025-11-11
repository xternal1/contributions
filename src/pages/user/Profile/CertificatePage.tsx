import DashboardLayout from "../../../components/public/auth/DashboardLayout"

const CertificatePage = () => {
    return (
        <DashboardLayout slug="certificate">
             <main className="flex-1 ml-0 2xl:ml-8 xl:ml-8 lg:ml-8">
                {/* Aktivitas Belajar */}
                <section className="text-start">
                    <h2 className="text-xl font-bold">Daftar Sertifikat</h2>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <img className="w-80" src="/src/assets/img/no-data/empty.svg" alt="no-data" />
                        <p className="text-black text-xl font-bold dark:text-white">Data Kosong</p>
                    </div>
                </section> 
            </main>
        </DashboardLayout>
    )
}

export default CertificatePage