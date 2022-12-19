import "../../../asset/style/ModalLoading.scss";
import { Space, Spin } from "antd";
import { createPortal } from "react-dom";

export const ModalLoading = () => {
  return createPortal(
    <div className="modalLoading">
      <Space>
        <Spin size="large" spinning={true}>
          <div className="content" />
        </Spin>
      </Space>
    </div>,
    document.body
  );
};
