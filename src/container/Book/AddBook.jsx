import {
  Col,
  Row,
  Button,
  Form,
  Input,
  Select,
  Upload,
  DatePicker,
  InputNumber,
  Card,
} from "antd";
import { useState } from "react";
import "../../asset/style/book/AddBook.scss";

export const AddBook = () => {
  const [fileList, setFileList] = useState([]);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <>
      <Card
        title="Thêm sách"
        bordered={false}
        style={{ padding: "0px 24px" }}
        className="addBook"
      >
        <Row>
          <Col span={16}>
            <Form
              name="addBook-form"
              size="large"
              layout="vertical"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
            >
              <Form.Item>
                <Form.Item
                  label="Tên sách"
                  name="bookName"
                  rules={[
                    { required: true, message: "Tiêu đề không được bỏ trống" },
                  ]}
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Tác giả"
                  name="author"
                  rules={[
                    { required: true, message: "Tác giả không được bỏ trống" },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: 16,
                  }}
                >
                  <Input />
                </Form.Item>
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  { required: true, message: "Mô tả không được bỏ trống" },
                ]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Form.Item
                  label="Ngày xuất bản"
                  name="datePublish"
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                  rules={[
                    {
                      required: true,
                      message: "Ngày xuất bản không được bỏ trống",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Số trang"
                  name="pageNumber"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: 16,
                  }}
                  rules={[
                    { required: true, message: "Số trang không được bỏ trống" },
                  ]}
                >
                  <InputNumber style={{ width: "100%" }} />
                </Form.Item>
              </Form.Item>
              <Form.Item
                label="Thể loại"
                name="category"
                rules={[
                  { required: true, message: "Tác giả không được bỏ trống" },
                ]}
              >
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>
          <Col span={8}>
            <Upload
              className="addBook-upload"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              beforeUpload={(file) => {
                setFileList([file]);
                return false;
              }}
            >
              + Upload
            </Upload>
          </Col>
        </Row>
        <Button htmlType="submit" form="addBook-form">
          Submit
        </Button>
      </Card>
    </>
  );
};