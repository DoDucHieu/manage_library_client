import {
  Col,
  Row,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Card,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bookApi } from "../../api/bookApi";
import "../../asset/style/book/AddBook.scss";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import moment from "moment";
import { ModalLoading } from "../../common/component/Modal/ModalLoading";

export const DetailBook = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [form] = Form.useForm();
  const [detailBook, setDetailBook] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    handleGetDetailBook(params.id);
  }, []);

  useEffect(() => {
    detailBook && handleFillForm();
  }, [detailBook]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedFile) return;
    const imageRef = ref(storage, `image/${selectedFile.name + v4()}`);
    await uploadBytesResumable(imageRef, selectedFile);
    const res = await getDownloadURL(imageRef);
    return res;
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const imgUrl = selectedFile ? await uploadImage() : preview;
      const data = {
        ...values,
        id: params.id,
        imgUrl: `${imgUrl}`,
      };
      await bookApi.update(data);
      navigate("/");
    } catch (error) {
      console.log("err: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetDetailBook = async (id) => {
    try {
      setLoading(true);
      const res = await bookApi.getDetail(id);
      setDetailBook(res?.data?.book);
    } catch (e) {
      console.log("err: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleFillForm = () => {
    form.setFieldValue("title", detailBook.title);
    form.setFieldValue("author", detailBook.author);
    form.setFieldValue("description", detailBook.description);
    form.setFieldValue("datePublish", moment(detailBook.datePublish));
    form.setFieldValue("pageNumber", detailBook.pageNumber);
    form.setFieldValue("category", detailBook.category);
    form.setFieldValue("price", detailBook.price);
    setPreview(detailBook.imgUrl);
  };

  const cancelValidateForm = () => {
    form.setFields([
      {
        name: "title",
        errors: [],
      },
      {
        name: "author",
        errors: [],
      },
      {
        name: "description",
        errors: [],
      },
      {
        name: "datePublish",
        errors: [],
      },
      {
        name: "pageNumber",
        errors: [],
      },
      {
        name: "category",
        errors: [],
      },
      {
        name: "price",
        errors: [],
      },
    ]);
  };

  return (
    <>
      {loading && <ModalLoading />}
      <Card
        title="Th??m s??ch"
        bordered={false}
        style={{ padding: "0px 24px" }}
        className="addBook"
      >
        <Row>
          <Col span={16}>
            <Form
              form={form}
              name="addBook-form"
              size="large"
              layout="vertical"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 20,
              }}
              onFinish={onFinish}
            >
              <Form.Item>
                <Form.Item
                  label="Ti??u ?????"
                  name="title"
                  rules={[
                    { required: true, message: "Ti??u ????? kh??ng ???????c b??? tr???ng" },
                  ]}
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  label="T??c gi???"
                  name="author"
                  rules={[
                    { required: true, message: "T??c gi??? kh??ng ???????c b??? tr???ng" },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: 16,
                  }}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
              </Form.Item>
              <Form.Item
                label="M?? t???"
                name="description"
                rules={[
                  { required: true, message: "M?? t??? kh??ng ???????c b??? tr???ng" },
                ]}
              >
                <Input.TextArea rows={4} disabled={isDisabled} />
              </Form.Item>
              <Form.Item>
                <Form.Item
                  label="Ng??y xu???t b???n"
                  name="datePublish"
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                  rules={[
                    {
                      required: true,
                      message: "Ng??y xu???t b???n kh??ng ???????c b??? tr???ng",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} disabled={isDisabled} />
                </Form.Item>
                <Form.Item
                  label="S??? trang"
                  name="pageNumber"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: 16,
                  }}
                  rules={[
                    { required: true, message: "S??? trang kh??ng ???????c b??? tr???ng" },
                  ]}
                >
                  <InputNumber
                    style={{ width: "100%" }}
                    disabled={isDisabled}
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Form.Item
                  label="Th??? lo???i"
                  name="category"
                  rules={[
                    { required: true, message: "Th??? lo???i kh??ng ???????c b??? tr???ng" },
                  ]}
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Select disabled={isDisabled}>
                    <Select.Option value="Truyen">Truy???n</Select.Option>
                    <Select.Option value="Sach">S??ch</Select.Option>
                    <Select.Option value="Bao">B??o</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Gi?? ti???n"
                  name="price"
                  rules={[
                    { required: true, message: "Gi?? ti???n kh??ng ???????c b??? tr???ng" },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: 16,
                  }}
                >
                  <Input disabled={isDisabled} />
                </Form.Item>
              </Form.Item>
            </Form>
          </Col>
          <Col span={8}>
            <div className="upload">
              {!isDisabled && (
                <label for="file-upload" className="custom-file-upload">
                  Upload
                </label>
              )}
              <input type="file" id="file-upload" onChange={onSelectFile} />
              {preview && <img src={preview} className="preview-img" />}
            </div>
          </Col>
        </Row>
        {isDisabled ? (
          <div className="detail-btn">
            <div
              style={{
                width: 160,
                height: 40,
                backgroundColor: "#1677ff",
                cursor: "pointer",
                borderRadius: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
              }}
              onClick={() => {
                setIsDisabled(false);
              }}
            >
              Ch???nh s???a
            </div>
            <Button
              style={{ width: 160, height: 40, marginLeft: 16 }}
              onClick={() => {
                navigate("/");
              }}
            >
              Tr??? v???
            </Button>
          </div>
        ) : (
          <div className="detail-btn">
            <Button
              htmlType="submit"
              form="addBook-form"
              type="primary"
              style={{ width: 160, height: 40 }}
            >
              L??u
            </Button>
            <Button
              style={{ width: 160, height: 40, marginLeft: 16 }}
              onClick={() => {
                setIsDisabled(true);
                cancelValidateForm();
                handleFillForm();
              }}
            >
              H???y
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};
