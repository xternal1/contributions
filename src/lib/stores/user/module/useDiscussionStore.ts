import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Discussion, DiscussionTag, DiscussionCourse } from '../../../../features/discussion/_discussion';
import type { ProfilData } from '../../../../features/user/models';
import { fetchModules, fetchDiscussions, fetchTags, fetchSubmitDiscussion, fetchSubmitTags } from '../../../../features/discussion/_service/discussionService';
import { fetchProfile } from '../../../../features/user/user_service';
import toast from 'react-hot-toast';

interface FilterState {
  selectedModule: string;
  search: string;
  selectedTags: string[];
  filterStatus: string[];
  sortOrder: string[];
}

interface NewDiscussionState {
  showModal: boolean;
  selectedModuleForNewDiscussion: string;
  title: string;
  description: string;
  tagsInput: string[];
}

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
}

interface DiscussionState {
  // Data state
  modules: DiscussionCourse[];
  discussions: Discussion[];
  tags: DiscussionTag[];
  currentUser: ProfilData | null;
  loadingDiscussions: boolean;
  
  // Feature states
  filter: FilterState;
  newDiscussion: NewDiscussionState;
  pagination: PaginationState;
  
  // Actions
  actions: {
    // Data fetching
    fetchModules: (courseSlug: string) => Promise<void>;
    fetchDiscussions: (courseSlug: string) => Promise<void>;
    fetchAllTags: () => Promise<void>;
    fetchUserProfile: () => Promise<void>;
    
    // Filter actions
    setSelectedModule: (moduleId: string) => void;
    setSearch: (search: string) => void;
    toggleTag: (tagName: string) => void;
    setFilterStatus: (status: string[]) => void;
    setSortOrder: (order: string[]) => void;
    resetFilters: () => void;
    
    // New discussion actions
    openNewDiscussionModal: () => void;
    closeNewDiscussionModal: () => void;
    setSelectedModuleForNewDiscussion: (moduleId: string) => void;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    setTagsInput: (tags: string[]) => void;
    resetNewDiscussionForm: () => void;
    submitDiscussion: (courseSlug: string) => Promise<void>;
    
    // Pagination actions
    setCurrentPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
  };
  
  // Derived data
  derived: {
    getFilteredDiscussions: () => Discussion[];
    getPaginatedDiscussions: () => Discussion[];
    getTotalPages: () => number;
    canLoadMore: () => boolean;
  };
}

// Initial states
const initialFilterState: FilterState = {
  selectedModule: '',
  search: '',
  selectedTags: [],
  filterStatus: [],
  sortOrder: [],
};

const initialNewDiscussionState: NewDiscussionState = {
  showModal: false,
  selectedModuleForNewDiscussion: '',
  title: '',
  description: '',
  tagsInput: [],
};

const initialPaginationState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 5,
};

export const useDiscussionStore = create<DiscussionState>()(
  persist(
    (set, get) => ({
      // Data state
      modules: [],
      discussions: [],
      tags: [],
      currentUser: null,
      loadingDiscussions: true,
      
      // Feature states
      filter: initialFilterState,
      newDiscussion: initialNewDiscussionState,
      pagination: initialPaginationState,
      
      // Actions
      actions: {
        // Data fetching
        fetchModules: async (courseSlug) => {
          try {
            const data = await fetchModules(courseSlug || "all");
            set({ modules: data });
          } catch (error) {
            console.error("Gagal memuat modul:", error);
            throw error;
          }
        },
        
        fetchDiscussions: async (courseSlug) => {
          const { filter: { selectedModule, filterStatus, sortOrder } } = get();
          set({ loadingDiscussions: true });
          try {
            if (courseSlug) {
              const data = await fetchDiscussions(
                courseSlug,
                selectedModule || undefined,
                filterStatus,
                sortOrder
              );
              set({ discussions: data, loadingDiscussions: false });
            }
          } catch (error) {
            console.error("Gagal fetch data diskusi:", error);
            set({ loadingDiscussions: false });
            throw error;
          }
        },
        
        fetchAllTags: async () => {
          try {
            const data = await fetchTags();
            set({ tags: data });
          } catch (error) {
            console.error("Gagal memuat tags:", error);
            throw error;
          }
        },
        
        fetchUserProfile: async () => {
          try {
            const user = await fetchProfile();
            set({ currentUser: user });
          } catch (error) {
            console.warn("Gagal ambil user login:", error);
          }
        },
        
        // Filter actions
        setSelectedModule: (moduleId) => {
          set(state => ({
            filter: { ...state.filter, selectedModule: moduleId },
            pagination: { ...state.pagination, currentPage: 1 }
          }));
        },
        
        setSearch: (search) => {
          set(state => ({
            filter: { ...state.filter, search },
            pagination: { ...state.pagination, currentPage: 1 }
          }));
        },
        
        toggleTag: (tagName) => {
          set(state => {
            const { selectedTags } = state.filter;
            const newTags = selectedTags.includes(tagName)
              ? selectedTags.filter(tag => tag !== tagName)
              : [...selectedTags, tagName];
              
            return {
              filter: { ...state.filter, selectedTags: newTags },
              pagination: { ...state.pagination, currentPage: 1 }
            };
          });
        },
        
        setFilterStatus: (status) => {
          set(state => ({
            filter: { ...state.filter, filterStatus: status },
            pagination: { ...state.pagination, currentPage: 1 }
          }));
        },
        
        setSortOrder: (order) => {
          set(state => ({
            filter: { ...state.filter, sortOrder: order },
            pagination: { ...state.pagination, currentPage: 1 }
          }));
        },
        
        resetFilters: () => {
          set(state => ({
            filter: initialFilterState,
            pagination: { ...state.pagination, currentPage: 1 }
          }));
        },
        
        // New discussion actions
        openNewDiscussionModal: () => {
          set(state => ({
            newDiscussion: { ...state.newDiscussion, showModal: true }
          }));
          // Prevent scrolling when modal is open
          document.body.style.overflow = "hidden";
        },
        
        closeNewDiscussionModal: () => {
          set(state => ({
            newDiscussion: { ...state.newDiscussion, showModal: false }
          }));
          document.body.style.overflow = "auto";
        },
        
        setSelectedModuleForNewDiscussion: (moduleId) => {
          set(state => ({
            newDiscussion: { ...state.newDiscussion, selectedModuleForNewDiscussion: moduleId }
          }));
        },
        
        setTitle: (title) => {
          set(state => ({
            newDiscussion: { ...state.newDiscussion, title }
          }));
        },
        
        setDescription: (description) => {
          set(state => ({
            newDiscussion: { ...state.newDiscussion, description }
          }));
        },
        
        setTagsInput: (tags) => {
          set(state => ({
            newDiscussion: { ...state.newDiscussion, tagsInput: tags }
          }));
        },
        
        resetNewDiscussionForm: () => {
          set(state => ({
            newDiscussion: {
              ...initialNewDiscussionState,
              showModal: state.newDiscussion.showModal
            }
          }));
        },
        
        submitDiscussion: async (courseSlug) => {
          const { newDiscussion, tags, actions } = get();
          const { selectedModuleForNewDiscussion, title, description, tagsInput } = newDiscussion;
          
          if (!courseSlug || !title.trim() || !description.trim()) {
            throw new Error("Judul dan deskripsi wajib diisi!");
          }
          
          try {
            // Process tags
            const ensuredTags = await Promise.all(
              tagsInput.map(async (tagName) => {
                const existing = tags.find((t) => t.name.toLowerCase() === tagName.toLowerCase());
                if (existing) return existing.name;
                
                try {
                  const newTag = await fetchSubmitTags(tagName.trim());
                  set(state => ({ tags: [...state.tags, newTag] }));
                  return newTag.name;
                } catch (err) {
                  console.error("Gagal menambahkan tag:", err);
                  throw err;
                }
              })
            );
            
            // Prepare form data
            const formData = new FormData();
            formData.append("module_id", selectedModuleForNewDiscussion);
            formData.append("discussion_title", title.trim());
            formData.append("discussion_question", description);
            
            ensuredTags.forEach((tag, index) => {
              formData.append(`tag[${index}]`, tag);
            });
            
            // Submit discussion
            await fetchSubmitDiscussion(courseSlug, formData);
            
            // Refresh discussions
            await actions.fetchDiscussions(courseSlug);
            
            // Reset form and close modal
            actions.resetNewDiscussionForm();
            actions.closeNewDiscussionModal();
            
            toast.success("Diskusi berhasil dibuat!");
          } catch (err) {
            console.error("Error submitting discussion:", err);
            toast.error(err instanceof Error ? err.message : "Gagal membuat diskusi");
            throw err;
          }
        },
        
        // Pagination actions
        setCurrentPage: (page) => {
          set(state => ({
            pagination: { ...state.pagination, currentPage: Math.max(1, page) }
          }));
        },
        
        nextPage: () => {
          set(state => {
            const totalPages = Math.ceil(
              get().derived.getFilteredDiscussions().length / state.pagination.itemsPerPage
            );
            return {
              pagination: {
                ...state.pagination,
                currentPage: Math.min(state.pagination.currentPage + 1, totalPages)
              }
            };
          });
        },
        
        prevPage: () => {
          set(state => ({
            pagination: {
              ...state.pagination,
              currentPage: Math.max(1, state.pagination.currentPage - 1)
            }
          }));
        },
      },
      
      // Derived data
      derived: {
        getFilteredDiscussions: () => {
          const { discussions, filter: { search, selectedTags } } = get();
          
          return discussions.filter((d) => {
            const matchesSearch = d.discussion_title
              ?.toLowerCase()
              .includes(search.toLowerCase());
              
            const matchesTags =
              selectedTags.length === 0 ||
              d.discussion_tags?.some(t => 
                t?.tag?.name && selectedTags.includes(t.tag.name)
              );
              
            return matchesSearch && matchesTags;
          });
        },
        
        getPaginatedDiscussions: () => {
          const { derived, pagination: { currentPage, itemsPerPage } } = get();
          const filtered = derived.getFilteredDiscussions();
          
          return filtered.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          );
        },
        
        getTotalPages: () => {
          const { derived, pagination: { itemsPerPage } } = get();
          const filteredCount = derived.getFilteredDiscussions().length;
          return Math.max(1, Math.ceil(filteredCount / itemsPerPage));
        },
        
        canLoadMore: () => {
          const { derived, pagination: { currentPage } } = get();
          return currentPage < derived.getTotalPages();
        }
      },
    }),
    {
      name: 'discussion-store', // Unique name for local storage
      partialize: (state) => ({
        filter: state.filter,
        pagination: {
          ...state.pagination,
          currentPage: 1 // Reset pagination on reload
        }
      }),
    }
  )
);

// Helper hook for easier usage
export const useDiscussionActions = () => {
  return useDiscussionStore(state => state.actions);
};

export const useDiscussionDerived = () => {
  return useDiscussionStore(state => state.derived);
};

export const useDiscussionData = () => {
  return useDiscussionStore(state => ({
    modules: state.modules,
    discussions: state.discussions,
    tags: state.tags,
    currentUser: state.currentUser,
    loadingDiscussions: state.loadingDiscussions,
    filter: state.filter,
    newDiscussion: state.newDiscussion,
    pagination: state.pagination
  }));
};