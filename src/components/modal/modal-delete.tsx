import { X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import useModalStore from "@/lib/store/modal-store";
import BlogBtn from "../general/blog-btn";
import { usePost } from "@/hooks/usePost";
import BlogSpinner from "../general/blog_spinner";

interface ModalProp {
  isOpen: boolean;
  onClose: () => void;
}
const ModalDelete = ({ isOpen, onClose }: ModalProp) => {
  const params = useParams();
  const postId = params?.postId as string;
  const { deletePostMutation } = usePost();
  const { openModal, closeModal } = useModalStore();
  const router = useRouter();
  if (!isOpen) return null;
  const handleClick = async () => {
    deletePostMutation.mutate(postId);
  };
  return (
    <div className="modal_bg">
      {deletePostMutation.isPending ? (
        <div className="modal_spinner">
          <BlogSpinner />
          <span className="modal_spinner_text">Deletion in progress</span>
        </div>
      ) : (
        <div className="modal_confirm">
          <p className="modal_confirmhead">
            <span>Deletion confirmation</span>
            <span className="modal_confirmicon">
              <X onClick={onClose} />
            </span>
          </p>

          <p className="modal_confirmtitle">
            Are you sure you want to delete this post?
          </p>
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
      )}
    </div>
  );
};

export default ModalDelete;
