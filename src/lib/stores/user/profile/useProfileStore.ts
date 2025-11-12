// src/lib/stores/user/profile/useProfileStore.ts
import { create } from "zustand";
import type { ProfilData } from "../../../../features/user/models";
import {
  fetchProfile,
  updateProfile as updateProfileService,
  UpdatePassword as updatePasswordService,
} from "../../../../features/user/user_service";

type ShowPassword = {
  old: boolean;
  new: boolean;
  confirm: boolean;
};

type ProfileState = {
  profile: ProfilData | null;
  loading: boolean;
  error: string;

  // form state
  form: {
    name: string;
    email: string;
    phone_number: string;
    address: string;
    gender: string;
  };
  passwordForm: {
    old_password: string;
    password: string;
    password_confirmation: string;
  };

  // uploads / previews
  photoFile: File | null;
  photoPreview: string;
  bannerFile: File | null;
  bannerPreview: string;

  // UI
  activeTab: "profile" | "password";
  showPassword: ShowPassword;
  refreshKey: number;

  // pagination / misc not needed here but kept for parity
  // actions
  loadProfile: () => Promise<void>;
  submitProfileUpdate: (formData: FormData) => Promise<void>;
  submitPasswordUpdate: (payload: { old_password: string; password: string; password_confirmation: string; }) => Promise<boolean>;

  // setters
  setForm: (partial: Partial<ProfileState["form"]>) => void;
  setPasswordForm: (partial: Partial<ProfileState["passwordForm"]>) => void;
  setPhotoFile: (file: File | null) => void;
  setPhotoPreview: (url: string) => void;
  setBannerFile: (file: File | null) => void;
  setBannerPreview: (url: string) => void;
  setActiveTab: (tab: "profile" | "password") => void;
  setShowPassword: (partial: Partial<ShowPassword>) => void;
  incrementRefreshKey: () => void;
  setError: (msg: string) => void;
  setLoading: (v: boolean) => void;
};

type SetFn<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;
type GetFn<T> = () => T;

export const useProfileStore = create<ProfileState>((set: SetFn<ProfileState>, _get: GetFn<ProfileState>) => ({
  profile: null,
  loading: true,
  error: "",

  form: {
    name: "",
    email: "",
    phone_number: "",
    address: "",
    gender: "",
  },

  passwordForm: {
    old_password: "",
    password: "",
    password_confirmation: "",
  },

  photoFile: null,
  photoPreview: "",
  bannerFile: null,
  bannerPreview: "",

  activeTab: "profile",
  showPassword: { old: false, new: false, confirm: false },
  refreshKey: 0,

  loadProfile: async () => {
    set({ loading: true, error: "" });
    try {
      const data = await fetchProfile();
      if (data) {
        set({
          profile: data,
          form: {
            name: data.name || "",
            email: data.email || "",
            phone_number: data.phone_number || "",
            address: data.address || "",
            gender:
              data.gender?.toLowerCase() === "laki-laki" || data.gender?.toLowerCase() === "laki-laki"
                ? "laki-laki"
                : data.gender?.toLowerCase() === "perempuan" || data.gender?.toLowerCase() === "perempuan"
                ? "perempuan"
                : "",
          },
        });
      } else {
        set({ profile: null });
      }
    } catch (err) {
      console.error("Gagal load profile", err);
      set({ error: "Gagal memuat profile", profile: null });
    } finally {
      setTimeout(() => set({ loading: false }), 300);
    }
  },

  submitProfileUpdate: async (formData: FormData) => {
    set({ loading: true, error: "" });
    try {
      await updateProfileService(formData);

      // refresh from server
      const fresh = await fetchProfile();
      set({
        profile: fresh ?? null,
        photoFile: null,
        bannerFile: null,
        photoPreview: "",
        bannerPreview: "",
      });

      // bump refresh key and move to profile tab like the page did
      set((s) => ({ refreshKey: s.refreshKey + 1, activeTab: "profile" }));
    } catch (err) {
      console.error("Update profile gagal", err);
      set({ error: (err instanceof Error && err.message) ? err.message : "Update profil gagal" });
      throw err; // rethrow so UI can show dialogs if needed
    } finally {
      set({ loading: false });
    }
  },

  submitPasswordUpdate: async (payload) => {
    set({ loading: true, error: "" });
    try {
      // delegate to service
      const res = await updatePasswordService(payload);
      // service returns truthy/falsy based on your implementation (page expects truthy)
      set({ passwordForm: { old_password: "", password: "", password_confirmation: "" } });
      return Boolean(res);
    } catch (err) {
      console.error("Update password gagal", err);
      set({ error: (err instanceof Error && err.message) ? err.message : "Gagal memperbarui password." });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // setters
  setForm: (partial) => set((s) => ({ form: { ...s.form, ...partial } })),
  setPasswordForm: (partial) => set((s) => ({ passwordForm: { ...s.passwordForm, ...partial } })),
  setPhotoFile: (file) => set({ photoFile: file }),
  setPhotoPreview: (url) => set({ photoPreview: url }),
  setBannerFile: (file) => set({ bannerFile: file }),
  setBannerPreview: (url) => set({ bannerPreview: url }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setShowPassword: (partial) => set((s) => ({ showPassword: { ...s.showPassword, ...partial } })),
  incrementRefreshKey: () => set((s) => ({ refreshKey: s.refreshKey + 1 })),
  setError: (msg) => set({ error: msg }),
  setLoading: (v) => set({ loading: v }),
}));
