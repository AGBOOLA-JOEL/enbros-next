"use client";
import ModalDelete from "@/components/modal/modal-delete";
import ModalLoading from "@/components/modal/modal-loading";
import ModalLogout from "@/components/modal/modal-logout";
import useModalStore from "@/lib/store/modal-store";

import { useEffect } from "react";

const ModalProvider = () => {
  const { activeModal, closeModal } = useModalStore();

  useEffect(() => {
    if (activeModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [activeModal]);
  return (
    <div
      id="modal-root"
      style={{ display: `${activeModal !== null ? "flex" : "none"}` }}
    >
      {activeModal === "loading" && (
        <ModalLoading isOpen={true} onClose={closeModal} />
      )}

      {activeModal === "logout" && (
        <ModalLogout isOpen={true} onClose={closeModal} />
      )}
      {activeModal === "delete" && (
        <ModalDelete isOpen={true} onClose={closeModal} />
      )}
    </div>
  );
};

export default ModalProvider;
