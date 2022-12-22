import { Card, Row, Col, Carousel  } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { bookApi } from '../../../api/bookApi';
import CONSTANT from '../../../common/constant';

const contentStyle = {
    height: "100%",
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
  };

export const HomePageUser = ()=>{
    const [listBook, setListBook] = useState([]);

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

      useEffect(() => {
        handleGetAllBook();
      }, []);
    return <>
    <Card bordered={false} style={{ width: "100%" }}>
        <Carousel>
            {
                listBook && listBook.map((item,index)=>{
                    return(
                            <div style={contentStyle}>
                                <Card bordered={false} style={contentStyle}>
                                    <p>{item.title}</p>
                                    <img src="https://img.freepik.com/free-psd/banner-bookstore-ad-template_23-2148680419.jpg?w=2000" alt="" style={{width:"100%", objectFit:"cover"}}/>
                                </Card>
                                
                            </div>
                    )
                })
            }
            
        </Carousel>
    </Card>
 </>
}

{/* <div>
<h3 style={contentStyle}>1</h3>
</div>
<div>
<h3 style={contentStyle}>2</h3>
</div>
<div>
<h3 style={contentStyle}>3</h3>
</div>
<div>
<h3 style={contentStyle}>4</h3>
</div> */}