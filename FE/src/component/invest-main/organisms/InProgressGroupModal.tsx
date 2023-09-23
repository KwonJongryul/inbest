import Modal from "react-modal";
import { CONTENT_MODAL_STYLE, OVERLAY_MODAL_STYLE } from "../../../constant/MODAL_STYLE";
import modalStore from "../../../store/modalStore";

const InProgressGroupModal = () => {
  const { modalType, closeModal, detailGroupCode } = modalStore();
  return (
    <Modal
      isOpen={modalType === "inProgressGroup"}
      ariaHideApp={false}
      onRequestClose={closeModal}
      closeTimeoutMS={300}
      style={{
        content: {
          ...CONTENT_MODAL_STYLE,
          width: "500px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "all 0.3s ease",
        },
        overlay: OVERLAY_MODAL_STYLE,
      }}
    >
      in progress modal
      {detailGroupCode}
    </Modal>
  );
};
export default InProgressGroupModal;
