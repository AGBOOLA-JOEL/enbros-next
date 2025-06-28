import { create } from "zustand";

interface ModalState {
  activeModal: string | null;
  openModal: (modalName: "loading" | "logout" | "delete") => void;
  closeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  openModal: (modalName) => set({ activeModal: modalName }),
  closeModal: () => set({ activeModal: null }),
}));

export default useModalStore;
