import api from "../../../services/api";
import type { ModuleType, SubModuleDetailType, QuizType, ModuleTaskType, CoursePostTestResponse,QuizResponse, UserQuizResult, UserQuizResultResponse,ModuleDetailType} from "../_module";

// Ambil detail module berdasarkan slug
export async function fetchModuleBySlug(slug: string): Promise<ModuleDetailType> {
  try {
    const response = await api.get(`/api/module/${slug}`);
    return response.data?.data;
  } catch (error) {
    console.error(`Gagal mengambil detail module ${slug}:`, error);
    throw error;
  }
}

// Ambil semua module dari course
export async function fetchModules(courseSlug: string): Promise<ModuleType[]> {
  try {
    const response = await api.get(`/api/list-module/${courseSlug}`);
    return response.data?.data || [];
  } catch (error) {
    console.error("Gagal mengambil data module:", error);
    throw error;
  }
}

// Ambil detail submodule
export async function fetchSubModule(slug: string): Promise<SubModuleDetailType> {
  try {
    const response = await api.get(`/api/sub-modules/detail/${slug}`);
    return response.data?.data;
  } catch (error) {
    console.error(`Gagal mengambil detail submodule ${slug}:`, error);
    throw error;
  }
}

export async function fetchQuizDetail(slug: string): Promise<QuizType> {
  try {
    const response = await api.get<QuizResponse>(`/api/quizzes/${slug}`);
    // kembalikan objek quiz langsung
    return response.data.data;
  } catch (error) {
    console.error(`❌ Gagal mengambil detail quiz ${slug}:`, error);
    throw error;
  }
}

// Ambil semua task berdasarkan module_id
export async function fetchModuleTasks(moduleId: string): Promise<ModuleTaskType[]> {
  try {
    const response = await api.get(`/api/module-tasks/${moduleId}`); 
    return response.data?.data || [];
  } catch (error) {
    console.error(`Gagal mengambil tugas modul ${moduleId}:`, error);
    throw error;
  }
}

export async function downloadSubmissionTask(submissionTaskId: string): Promise<void> {
  try {
    const response = await api.get(`/api/submission-tasks/download/${submissionTaskId}`, {
      responseType: 'blob'
    });
    
    // Dapatkan informasi dari headers
    const contentDisposition = response.headers['content-disposition'];
    const contentType = response.headers['content-type'];
    
    let filename = 'submission-file';
    
    // Extract filename dari Content-Disposition header
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
      if (filenameMatch) {
        filename = filenameMatch[1];
      }
    }
    
    // Determine file extension berdasarkan Content-Type
    const fileExtension = getFileExtensionFromContentType(contentType, filename);
    const finalFilename = ensureFileExtension(filename, fileExtension);
    
    // Validasi tipe file yang diizinkan
    validateAllowedFileType(contentType, finalFilename);
    
    // Create blob dengan type yang sesuai
    const blob = new Blob([response.data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    
    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = finalFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('❌ Gagal download file:', error);
    if (error instanceof Error && error.message.includes('File type not allowed')) {
      throw new Error('Tipe file tidak diizinkan untuk diunduh');
    }
    throw new Error('Gagal mengunduh file');
  }
}

// Helper function untuk validasi tipe file yang diizinkan
function validateAllowedFileType(contentType: string, filename: string): void {
  const allowedTypes = [
    // Archive files
    'application/zip',
    'application/x-zip-compressed',
    'application/x-rar-compressed',
    'application/vnd.rar',
    // Image files
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ];

  const fileExtension = filename.split('.').pop()?.toLowerCase();
  const allowedExtensions = ['zip', 'rar', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

  // Validasi berdasarkan Content-Type dan extension
  const isContentTypeAllowed = allowedTypes.includes(contentType);
  const isExtensionAllowed = fileExtension ? allowedExtensions.includes(fileExtension) : false;

  if (!isContentTypeAllowed && !isExtensionAllowed) {
    throw new Error(`File type not allowed: ${contentType} (${filename})`);
  }
}

// Helper function untuk menentukan ekstensi file dari Content-Type
function getFileExtensionFromContentType(contentType: string, filename: string): string {
  // Jika filename sudah ada ekstensi yang valid, gunakan itu
  const existingExtension = filename.split('.').pop()?.toLowerCase();
  const allowedExtensions = ['zip', 'rar', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  
  if (existingExtension && allowedExtensions.includes(existingExtension)) {
    return existingExtension;
  }
  
  // Map Content-Type ke ekstensi file (hanya yang diizinkan)
  const extensionMap: { [key: string]: string } = {
    // Archive files
    'application/zip': 'zip',
    'application/x-zip-compressed': 'zip',
    'application/x-rar-compressed': 'rar',
    'application/vnd.rar': 'rar',
    // Image files
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
  };
  
  return extensionMap[contentType] || 'bin';
}

// Helper function untuk memastikan filename punya ekstensi yang benar
function ensureFileExtension(filename: string, extension: string): string {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  return `${nameWithoutExt}.${extension}`;
}

// Fungsi tambahan untuk preview file (jika diperlukan)
export async function previewSubmissionTask(submissionTaskId: string): Promise<string> {
  try {
    const response = await api.get(`/api/submission-tasks/download/${submissionTaskId}`, {
      responseType: 'blob'
    });
    
    const contentType = response.headers['content-type'];
    const filename = response.headers['content-disposition'] || '';
    
    // Validasi tipe file sebelum preview (khusus image)
    validateAllowedFileType(contentType, filename);
    
    // Hanya izinkan preview untuk image files
    const allowedPreviewTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml'
    ];
    
    if (!allowedPreviewTypes.includes(contentType)) {
      throw new Error('Preview hanya tersedia untuk file gambar');
    }
    
    const blob = new Blob([response.data], { type: contentType });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('❌ Gagal preview file:', error);
    if (error instanceof Error && error.message.includes('File type not allowed')) {
      throw new Error('Tipe file tidak diizinkan untuk preview');
    }
    throw new Error('Gagal memuat preview file');
  }
}

// Ambil Final Audit / Course Post Test berdasarkan course_test_id
export async function fetchCoursePostTest(courseTestId: string): Promise<CoursePostTestResponse> {
  try {
    const response = await api.get(`/api/course-post-test/${courseTestId}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal mengambil course post test ${courseTestId}:`, error);
    throw error;
  }
}

// Ambil hasil kuis user berdasarkan slug module
export async function fetchUserQuizResult(slugModule: string): Promise<UserQuizResult[]> {
  try {
    const response = await api.get<UserQuizResultResponse>(`/api/user-quizzes/${slugModule}`);
    return response.data.data || [];
  } catch (error) {
    console.error(`❌ Gagal mengambil hasil kuis user untuk module ${slugModule}:`, error);
    throw error;
  }
}