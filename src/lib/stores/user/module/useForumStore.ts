import { create } from 'zustand';
import type { Discussion, DiscussionAnswer } from '../../../../features/discussion/_discussion';
import type { ProfilData } from '../../../../features/user/models';
import { 
  fetchDiscussionsBySlug, 
  fetchDiscussionAnswers, 
  fetchSubmitAnswerUser
} from '../../../../features/discussion/_service/discussionService';
import { fetchProfile } from '../../../../features/user/user_service';

interface ForumState {
  // Data state
  discussion: Discussion | null;
  answers: DiscussionAnswer[];
  currentUser: ProfilData | null;
  
  // Loading state
  loadingDiscussion: boolean;
  loadingAnswers: boolean;
  replyLoading: boolean;
  
  // UI state
  activeReplyId: number | null;
  replyContents: Record<number, string>;
  error: string | null;
  
  // Actions
  actions: {
    // Data fetching
    fetchDiscussion: (slug: string) => Promise<void>;
    fetchAnswers: (discussionId: string) => Promise<void>;
    fetchUserProfile: () => Promise<void>;
    
    // Reply handling
    setActiveReplyId: (replyId: number | null) => void;
    setReplyContent: (replyId: number, content: string) => void;
    submitReply: (discussionId: string, parentId: number, content: string) => Promise<void>;
    resetReplyContent: (replyId: number) => void;
    
    // Utility
    clearError: () => void;
  };
  
  // Derived state
  derived: {
    getDiscussionTitle: () => string;
    getReplyContent: (replyId: number) => string;
  };
}

export const useForumStore = create<ForumState>((set, get) => ({
  // Initial state
  discussion: null,
  answers: [],
  currentUser: null,
  loadingDiscussion: true,
  loadingAnswers: true,
  replyLoading: false,
  activeReplyId: null,
  replyContents: {},
  error: null,
  
  // Actions
  actions: {
    // Data fetching
    fetchDiscussion: async (slug: string) => {
      set({ loadingDiscussion: true, error: null });
      try {
        const data = await fetchDiscussionsBySlug(slug);
        set({ discussion: data, loadingDiscussion: false });
      } catch (err) {
        const errorMessage = "Gagal memuat data diskusi.";
        console.error(err);
        set({ error: errorMessage, loadingDiscussion: false });
        throw new Error(errorMessage);
      }
    },
    
    fetchAnswers: async (discussionId: string) => {
      set({ loadingAnswers: true });
      try {
        const data = await fetchDiscussionAnswers(discussionId);
        set({ answers: data, loadingAnswers: false });
      } catch (err) {
        console.error("Gagal memuat balasan:", err);
        set({ loadingAnswers: false });
        throw new Error("Gagal memuat balasan.");
      }
    },
    
    fetchUserProfile: async () => {
      try {
        const user = await fetchProfile();
        set({ currentUser: user });
      } catch {
        console.warn("Gagal ambil user login");
      }
    },
    
    // Reply handling
    setActiveReplyId: (replyId: number | null) => {
      set({ activeReplyId: replyId });
    },
    
    setReplyContent: (replyId: number, content: string) => {
      set(state => ({
        replyContents: {
          ...state.replyContents,
          [replyId]: content
        }
      }));
    },
    
    submitReply: async (discussionId: string, parentId: number, content: string) => {
      const { currentUser, actions } = get();
      
      if (!content.trim()) {
        throw new Error("Isi balasan tidak boleh kosong!");
      }
      
      if (!currentUser) {
        throw new Error("Anda harus login untuk membalas diskusi.");
      }
      
      set({ replyLoading: true });
      
      try {
        await fetchSubmitAnswerUser(
          discussionId,
          String(parentId),
          {
            user_id: currentUser.id,
            answer: content,
          }
        );
        
        // Reset reply content and active reply
        actions.resetReplyContent(parentId);
        actions.setActiveReplyId(null);
        
        // Refresh data
        await Promise.all([
          actions.fetchDiscussion(get().discussion?.slug || ""),
          actions.fetchAnswers(discussionId),
        ]);
      } catch (error) {
        console.error("Gagal mengirim balasan:", error);
        throw error instanceof Error ? error : new Error("Gagal mengirim balasan.");
      } finally {
        set({ replyLoading: false });
      }
    },
    
    resetReplyContent: (replyId: number) => {
      set(state => {
        const newReplyContents = { ...state.replyContents };
        delete newReplyContents[replyId];
        return { replyContents: newReplyContents };
      });
    },
    
    // Utility
    clearError: () => {
      set({ error: null });
    },
  },
  
  // Derived state
  derived: {
    getDiscussionTitle: () => {
      const { discussion } = get();
      return discussion ? discussion.discussion_title : "Diskusi";
    },
    
    getReplyContent: (replyId: number) => {
      const { replyContents } = get();
      return replyContents[replyId] || "";
    },
  },
}));

// Helper hooks
export const useForumData = () => {
  return useForumStore(state => ({
    discussion: state.discussion,
    answers: state.answers,
    currentUser: state.currentUser,
    loadingDiscussion: state.loadingDiscussion,
    loadingAnswers: state.loadingAnswers,
    replyLoading: state.replyLoading,
    activeReplyId: state.activeReplyId,
    error: state.error,
  }));
};

export const useForumActions = () => {
  return useForumStore(state => state.actions);
};

export const useForumDerived = () => {
  return useForumStore(state => state.derived);
};