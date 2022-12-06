import React from "react";
import { Table } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
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
    dataIndex: "type",
  },
  {
    title: "Ngày phát hành",
    dataIndex: "publish",
  },
  {
    title: "Số trang",
    dataIndex: "pageNumber",
  },
  {
    title: "Chức năng",
    dataIndex: "function",
    width: 150,
    render: () => (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <EyeOutlined />
        <DeleteOutlined />
      </div>
    ),
  },
];
const data = [
  {
    key: "1",
    title: "Yêu",
    author: "Do Duc Hieu",
    type: "18+",
    publish: "20/11/2022",
    pageNumber: 200,
  },
  {
    key: "2",
    title: "Yêu",
    author: "Do Duc Hieu",
    type: "18+",
    publish: "20/11/2022",
    pageNumber: 199,
  },
  {
    key: "3",
    title: "Yêu",
    author: "Do Duc Hieu",
    type: "18+",
    publish: "20/11/2022",
    pageNumber: 200,
  },
];
const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const TableData = () => (
  <Table
    columns={columns}
    dataSource={data}
    onChange={onChange}
    className="tableData"
  />
);
export default TableData;
