import React from "react";
import { useNavigate } from "react-router-dom";
import { Download, ExternalLink } from "lucide-react";
import NavigationControlsComponent from "@/components/coursemodule/NavigationControls";
import { downloadSubmissionTask } from "@features/module/_service/module_service";
import type { ModuleTaskType, SubmissionTaskType, SubmissionType } from "@features/module/_module";

interface TaskContentProps {
  data: ModuleTaskType[];
  error: string | null;
  currentNavIndex: number;
  totalNavItems: number;
  currentSlug?: string | null;
  onNext: () => void;
  onPrevious: () => void;
  onDiscussion: () => void;
}

const TaskContent: React.FC<TaskContentProps> = ({
  data,
  error,
  currentNavIndex,
  totalNavItems,
  currentSlug,
  onNext,
  onPrevious,
  onDiscussion,
}) => {
  const navigate = useNavigate();

  const buttonClass = `
    font-sans font-medium text-xs md:text-sm py-1.5 px-3 md:px-4 rounded-full 
    flex items-center justify-center transition-all duration-300 ease-in-out
    shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]
    hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]
    active:translate-y-0.5 border
    bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 text-white 
    hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-600 hover:text-black 
    dark:bg-gradient-to-r dark:from-purple-600 dark:to-purple-700 dark:border-purple-600
    dark:hover:from-yellow-400 dark:hover:to-yellow-500 dark:hover:border-yellow-600 dark:hover:text-black
  `;

  const iconButtonClass = `
    w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-white
    transition-all duration-300 ease-in-out
    shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]
    hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)]
    active:translate-y-0.5 border
    bg-gradient-to-r from-purple-600 to-purple-700 border-purple-700 
    hover:from-yellow-400 hover:to-yellow-500 hover:border-yellow-600 hover:text-black 
    dark:bg-gradient-to-r dark:from-purple-600 dark:to-purple-700 dark:border-purple-600
    dark:hover:from-yellow-400 dark:hover:to-yellow-500 dark:hover:border-yellow-600 dark:hover:text-black
  `;

  const getSubmissionType = (task: ModuleTaskType): SubmissionType => {
    if (!task.submission_task || task.submission_task.length === 0) {
      return 'none';
    }

    const latestSubmission = task.submission_task[0];
    const hasFile = !!latestSubmission.file;
    const hasAnswer = !!latestSubmission.answer;

    if (hasFile) {
      return 'file';
    } else if (hasAnswer) {
      return 'link';
    }

    return 'none';
  };

  const getLatestSubmission = (task: ModuleTaskType): SubmissionTaskType | null => {
    if (!task.submission_task || task.submission_task.length === 0) {
      return null;
    }
    return task.submission_task[0];
  };

  const handleDownload = async (task: ModuleTaskType) => {
    try {
      const submission = getLatestSubmission(task);
      if (!submission) {
        alert('Tidak ada file yang dapat diunduh');
        return;
      }

      await downloadSubmissionTask(submission.id);
    } catch (error) {
      console.error('Gagal mengunduh file:', error);
      alert('Gagal mengunduh file. Silakan coba lagi.');
    }
  };

  const handleOpenLink = (task: ModuleTaskType) => {
    const submission = getLatestSubmission(task);
    if (!submission?.answer) {
      alert('Tidak ada link yang dapat dibuka');
      return;
    }

    let url = submission.answer;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderActionButtons = (task: ModuleTaskType) => {
    const submissionType = getSubmissionType(task);
    const submission = getLatestSubmission(task);

    if (!task.is_finish) {
      return (
        <button
          className={buttonClass}
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          Kerjakan
        </button>
      );
    }

    if (!submission || submissionType === 'none') {
      return (
        <button
          className={buttonClass}
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          Detail
        </button>
      );
    }

    return (
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
        <button
          className={buttonClass}
          onClick={() => navigate(`/tasks/${task.id}`)}
        >
          Detail
        </button>

        {submissionType === 'file' && (
          <button
            className={iconButtonClass}
            onClick={() => handleDownload(task)}
            title="Download File"
          >
            <Download size={16} />
          </button>
        )}

        {submissionType === 'link' && (
          <button
            className={iconButtonClass}
            onClick={() => handleOpenLink(task)}
            title="Buka Link Repository"
          >
            <ExternalLink size={16} />
          </button>
        )}
      </div>
    );
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-500">
      <div className="bg-purple-600 dark:bg-purple-800 text-white px-4 md:px-10 py-3 transition-colors duration-500">
        <h1 className="text-sm md:text-[15px] font-medium text-justify mt-2 line-clamp-2">
          Tugas {data[0]?.module.title}
        </h1>
      </div>

      <div className="p-4 md:p-6">
        <div className="max-w-full mx-auto bg-white dark:bg-gray-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-sm transition-colors duration-500">
          <h1 className="text-base md:text-lg font-bold mb-4 text-left text-gray-800 dark:text-white">Aturan</h1>

          <div className="mb-6 md:mb-7">
            <ul className="list-decimal list-inside text-left text-xs md:text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <li>Dikerjakan secara individu</li>
              <li>File yang dikumpulkan berupa .zip, maksimal ukuran 5 MB</li>
              <li>Atau bisa mengumpulkan link repository GitHub</li>
              <li>Jangan sampai melebihi deadline yang telah diberikan</li>
              <li>
                Apabila tugas pada materi ini belum dikumpulkan semua, maka kamu
                tidak bisa lanjut ke materi berikutnya
              </li>
            </ul>
          </div>

          {error ? (
            <p className="text-red-500 dark:text-red-400 text-center">{error}</p>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="w-full text-xs md:text-sm border border-gray-800 dark:border-gray-500 border-separate border-spacing-0 rounded-lg overflow-hidden">
                  <thead className="bg-purple-600 dark:bg-purple-700 text-white">
                    <tr>
                      <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">No</th>
                      <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">Tugas</th>
                      <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">Status</th>
                      <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">Nilai</th>
                      <th className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800">
                    {data.map((task, idx) => (
                      <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center text-gray-700 dark:text-gray-300">{idx + 1}</td>
                        <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 font-medium text-center min-w-[150px] text-gray-700 dark:text-gray-300">
                          {task.question}
                        </td>
                        <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">
                          {task.is_finish ? (
                            <span className="text-green-200 border bg-green-700 dark:text-green-100 dark:bg-green-800 px-1 md:px-3 py-1 rounded-md font-semibold whitespace-nowrap">Sudah Dikumpulkan</span>
                          ) : (
                            <span className="text-red-200 border bg-red-700 dark:text-red-100 dark:bg-red-800 px-1 md:px-3 py-1 rounded-md font-semibold whitespace-nowrap">Belum</span>
                          )}
                        </td>
                        <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center text-gray-700 dark:text-gray-300">
                          {task.average_score ?? "-"}
                        </td>
                        <td className="border border-gray-800 dark:border-gray-500 px-2 md:px-4 py-2 text-center">
                          {renderActionButtons(task)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 pt-6">
                <div className="bg-gray-100 dark:bg-purple-600 rounded-md p-2">
                  <NavigationControlsComponent
                    currentNavIndex={currentNavIndex}
                    totalNavItems={totalNavItems}
                    currentSlug={currentSlug}
                    onNext={onNext}
                    onPrevious={onPrevious}
                    onDiscussion={onDiscussion}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default TaskContent;
