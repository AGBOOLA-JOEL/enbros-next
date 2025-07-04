import { X } from "lucide-react";
import BlogBtn from "../general/blog-btn";
import { useAuth } from "@/hooks/useAuth";
import { useGenselectors } from "@/lib/store/general-store";

interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}
const ModalLogout = ({ isOpen, onClose }: ModalProp) => {
  const { logout } = useAuth();
  const toggleState = useGenselectors.use.toggleState();

  const handleClick = async () => {
    logout();
    toggleState();
    onClose();
  };
  if (!isOpen) return null;
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
