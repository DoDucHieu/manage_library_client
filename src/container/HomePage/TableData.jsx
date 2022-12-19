import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { bookApi } from "../../api/bookApi";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import CONSTANT from "../../common/constant";
import { ModalConfirmDelete } from "../../common/component/Modal/ModalConfirmDelete";

const TableData = () => {
  const [listBook, setListBook] = useState([]);
  const navigate = useNavigate();
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
            onClick={() => {
              navigate(`/detail/${record._id}`);
            }}
          />
          <DeleteOutlined onClick={() => {}} />
        </div>
      ),
    },
  ];

  const formatListBook = (data) => {
    // const arr = [];
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

  useEffect(() => {
    handleGetAllBook();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Table
      columns={columns}
      dataSource={listBook}
      onChange={onChange}
      className="tableData"
    />
  );
};
export default TableData;
