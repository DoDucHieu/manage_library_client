import { Button, Modal } from "antd";
export const ModalConfirm = ({openModal, handleSetOpenModal, callBack}) => {

  return (
    <>
      <Modal
        title="Thông báo"
        open={openModal}
        onOk={callBack}
        onCancel={handleSetOpenModal}
      >
        <p>Bạn có chắc muốn xóa không?</p>
      </Modal>
    </>
  );
};
