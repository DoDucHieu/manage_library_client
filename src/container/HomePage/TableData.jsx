import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { bookApi } from "../../api/bookApi";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import CONSTANT from "../../common/constant";
import { ModalConfirm } from "../../common/component/Modal/ModalConfirm";

const TableData = () => {
  const navigate = useNavigate();
  const [listBook, setListBook] = useState([]);
  const[openModal, setOpenModal] = useState(false);
  const [bookId, setBookId] = useState(undefined);
  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Thể loại",
      dataIndex: "category",
    },
    {
      title: "Ngày phát hành",
      dataIndex: "datePublish",
    },
    {
      title: "Số trang",
      dataIndex: "pageNumber",
    },
    {
      title: "Chức năng",
      dataIndex: "function",
      width: 150,
      render: (text, record) => (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <EyeOutlined
            style={{color:"blue"}}
            onClick={() => {
              navigate(`/detail/${record._id}`);
            }}
          />
          <DeleteOutlined style={{color:"red"}} onClick={() => {
              setOpenModal(true)
              setBookId(record._id)
            }} 
          />
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const formatListBook = (data) => {
    const arr = data.map((item) => {
      return {
        ...item,
        datePublish: moment(item.datePublish).format(CONSTANT.FORMAT_DATE),
      };
    });
    return arr;
  };

  const handleGetAllBook = async () => {
    try {
      const res = await bookApi.getAll();
      const data = formatListBook(res?.data?.listBook);
      console.log("data: ", data);
      setListBook(data);
    } catch (error) {
      console.log("err", error);
    }
  };

  const handleSetOpenModal = ()=>{
    setOpenModal(false)
  }

  const handleDeleteBook = async ()=>{
    try {
      const res = await bookApi.delete(bookId)
      await handleGetAllBook();
    } catch (error) {
      console.log("err: ", error);
    }
    finally{
      setOpenModal(false)
    }
  }

  useEffect(() => {
    handleGetAllBook();
  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={listBook}
        onChange={onChange}
        className="tableData"
      />
      {openModal && <ModalConfirm
        openModal={openModal}
        handleSetOpenModal={handleSetOpenModal}
        callBack={handleDeleteBook}
      />}
    </>
  );
};
export default TableData;
