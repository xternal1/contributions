import { BsFillInfoSquareFill } from "react-icons/bs"

const MaterialInfo = () => {
  return (
    <div className="text-left bg-yellow-50 dark:bg-yellow-900 border border-yellow-400 dark:border-yellow-600 text-yellow-800 dark:text-yellow-200 p-4 rounded-xl mb-6 transition-colors duration-500">
        <div className="flex items-center mb-2">
            <BsFillInfoSquareFill className="mr-2 text-yellow-400 dark:text-yellow-500" />
            <h3 className="text-lg font-semibold">Informasi</h3>
        </div>
        <ul className="text-sm list-disc list-inside pl-8 space-y-1">
            <li>
                Kamu harus mengerjakan text terlebih dahulu sebelum membuka materi untuk pertama kalinya
            </li>
            <li>
                Selesaikan materi sebelumnya untuk membuka materi yang dipilih
            </li>
            <li>
                Selesaikan semua tugas dari materi sebelumnya agar dapat membuka materi selanjutnya
            </li>
        </ul>
    </div>
  )
}

export default MaterialInfo