import BlogLoader from "../general/blog-loader";
import ModalPortal from "./modal-portal";

interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLoading = ({ isOpen, onClose }: ModalProp) => {
  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="modal_loading">
        <BlogLoader />
      </div>
    </ModalPortal>
  );
};

export default ModalLoading;
