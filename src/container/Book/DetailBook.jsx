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
    console.log("upload success!", res);
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

  const cancelValidateForm = ()=>{
    form.setFields([
      {
        name: 'title',
        errors: [],
      },
      {
        name: 'author',
        errors: [],
      },
      {
        name: 'description',
        errors: [],
      },
      {
        name: 'datePublish',
        errors: [],
      },
      {
        name: 'pageNumber',
        errors: [],
      },
      {
        name: 'category',
        errors: [],
      },
      {
        name: 'price',
        errors: [],
      },
    ]);
  }

  return (
    <>
      {loading && <ModalLoading />}
      <Card
        title="Thêm sách"
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
                  label="Tiêu đề"
                  name="title"
                  rules={[
                    { required: true, message: "Tiêu đề không được bỏ trống" },
                  ]}
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Input disabled={isDisabled}/>
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
                  <Input disabled={isDisabled}/>
                </Form.Item>
              </Form.Item>
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[
                  { required: true, message: "Mô tả không được bỏ trống" },
                ]}
              >
                <Input.TextArea rows={4} disabled={isDisabled}/>
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
                  <DatePicker style={{ width: "100%" }} disabled={isDisabled}/>
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
                  <InputNumber style={{ width: "100%" }} disabled={isDisabled}/>
                </Form.Item>
              </Form.Item>
              <Form.Item>
                <Form.Item
                  label="Thể loại"
                  name="category"
                  rules={[
                    { required: true, message: "Thể loại không được bỏ trống" },
                  ]}
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Select disabled={isDisabled}>
                    <Select.Option value="Khoa học">Khoa học</Select.Option>
                    <Select.Option value="Toán học">Toán học</Select.Option>
                    <Select.Option value="Thiên văn">Thiên văn</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Giá tiền"
                  name="price"
                  rules={[
                    { required: true, message: "Giá tiền không được bỏ trống" },
                  ]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    marginLeft: 16,
                  }}
                >
                  <Input disabled={isDisabled}/>
                </Form.Item>
              </Form.Item>
            </Form>
          </Col>
          <Col span={8}>
            <div className="upload">
              {!isDisabled && <label for="file-upload" className="custom-file-upload">
                Upload
              </label>}
              <input type="file" id="file-upload" onChange={onSelectFile} />
              {preview && <img src={preview} className="preview-img" />}
            </div>
          </Col>
        </Row>
        {isDisabled ? (
        <div className="detail-btn">
          <div
            style={{ width: 160, height:40, backgroundColor:"#1677ff", cursor:"pointer", borderRadius:3, display:"flex", justifyContent:"center", alignItems:"center", color:"white"}}
            onClick={()=>{setIsDisabled(false)}}
          >
            Chỉnh sửa
          </div>
          <Button
            style={{ width: 160, height:40, marginLeft: 16 }}
            onClick={() => {
              navigate("/");
            }}
          >
            Trở về
          </Button>
        </div>)
        :(
        <div className="detail-btn">
          <Button
            htmlType="submit"
            form="addBook-form"
            type="primary"
            style={{ width: 160, height:40}}
          >
            Lưu
          </Button>
          <Button
            style={{ width: 160, height:40, marginLeft: 16 }}
            onClick={() => {
              setIsDisabled(true)
              cancelValidateForm()
              handleFillForm()
            }}
          >
            Hủy
          </Button>
        </div>)}
      </Card>
    </>
  );
};
