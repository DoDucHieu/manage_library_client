import { Button, Rate } from "antd";
import { useState } from "react";
import { assessmentApi } from "../../api/assessmentApi";

export const Assessment = ({ userName, bookId }) => {
  const [rate, setRate] = useState(1);

  const handleAddAssessment = async () => {
    try {
      const data = {
        star: rate,
        userName: userName,
        bookId: bookId,
      };
      await assessmentApi.create(data);
    } catch (e) {
      console.log("error: ", e);
    }
  };

  return (
    <>
      <div className="rate">
        <span>Đánh giá: </span>
        <Rate
          defaultValue={rate}
          allowHalf
          onChange={(value) => {
            setRate(value);
          }}
        />
        <Button onClick={handleAddAssessment}>Gửi đánh giá</Button>
      </div>
    </>
  );
};
