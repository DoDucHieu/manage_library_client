import { SendOutlined } from "@ant-design/icons";
import { Avatar, List } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { commentApi } from "../../api/commentApi";
import "../../asset/style/Comment.scss";

export const Comment = ({ bookId, userName }) => {
  const [comment, setComment] = useState("");
  const [listComment, setListComment] = useState([]);

  const handleGetAllComment = async () => {
    try {
      const res = await commentApi.getAll(bookId);
      setListComment(res?.data?.data.reverse());
    } catch (e) {
      console.log("error: ", e);
    }
  };

  const handleAddComment = async () => {
    try {
      if (comment.trim() !== "") {
        const data = {
          comment: comment,
          bookId: bookId,
          userName: userName,
        };
        await commentApi.create(data);
      }
    } catch (e) {
      console.log("error: ", e);
    } finally {
      setComment("");
      await handleGetAllComment();
    }
  };

  useEffect(() => {
    handleGetAllComment();
  }, []);

  return (
    <div className="bookComment">
      <div className="addComment">
        <TextArea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Thêm bình luận ..."
          autoSize={{ minRows: 2, maxRows: 3 }}
        />
        <SendOutlined
          style={{ color: "#4E89FF", fontSize: 24, cursor: "pointer" }}
          onClick={handleAddComment}
        />
      </div>
      <div className="listComment">
        <List
          itemLayout="horizontal"
          dataSource={listComment}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.userName}
                description={item.comment}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
