import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import useModalStore from "@/lib/store/modal-store";
import BlogBtn from "../general/blog-btn";
import { useAuth } from "@/hooks/useAuth";

interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}
const ModalLogout = ({ isOpen, onClose }: ModalProp) => {
  const { logout } = useAuth();
  if (!isOpen) return null;
  const handleClick = async () => {
    logout();
    onClose();
  };
  return (
    <div className="modal_bg">
      <div className="modal_confirm">
        <p className="modal_confirmhead">
          <span>Logout confirmation</span>
          <span className="modal_confirmicon">
            <X onClick={onClose} />
          </span>
        </p>

        <p className="modal_confirmtitle">Are you sure you want to logout?</p>
        <div className="modal_confirmbtn">
          <BlogBtn
            type="button"
            name="Yes"
            onClick={handleClick}
            variant="primary"
          />
          <BlogBtn
            type="button"
            name="Cancel"
            onClick={onClose}
            variant="cancel"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalLogout;
