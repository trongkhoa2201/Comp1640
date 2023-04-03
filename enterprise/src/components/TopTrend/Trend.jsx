import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import '../TopTrend/Trend.css';
import Ava from "../../img/Ava.jpg"
// import idealModel from '../../../../Backend/Model/idealModel';


// const mongoose = require('mongoose');


// mongoose.connect('mongodb+srv://webenterprise:Webenterprise@webenterprise.5xrx8qp.mongodb.net/WebEnterprise', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
// const Ideal = mongoose.Model('idealModel');

const Trend = () => {
    // const [ideals, setIdeals] = useState([]);
    const [posts, setPosts] = useState([]);
    
  
// useEffect(() => {
//     Ideal.find()
//         .populate('category_id')
//         .populate('user_id')
//         .exec()
//         .then((res) => setIdeals(res))
//         .catch((err) => console.log(err));
// }, []);

    useEffect(() => {
      axios
          .get('/api/topics')
          .then((response) => {
              setPosts(response.data);
              console.log(posts);
          })
          .catch((error) => {
              console.log(error);
          });
    }, [posts]);

    return (
        <Container className="trend-container mb-4">
          <div className="trend-box" style={{ position: "relative" }}>
            <img
              className=" w-100 h-100"
              src={Ava}
              alt=""
              style={{ borderRadius: "12px" }}
            />
            <div className="layer">
              <div className="mb-3 mt-5">
                <h2 style={{ color: "white", fontSize: "20px" }}>lorem ipsum</h2>
              </div>
              <div style={{ color: "white", overflow: "hidden", height: "100px" }}>
                <p>
                  text
                </p>
              </div>
            </div>
          </div>
    
        </Container>
        // <Container className="trend-container mb-4">
        //     {posts.map((ideal) => (
        //         <div className="trend-box" key={ideal._id} style={{ position: 'relative' }}>
        //             <img
        //                 className=" w-100 h-100"
        //                 src={ideal.upload_file[0].default_image}
        //                 alt=""
        //                 style={{ borderRadius: '12px' }}
        //             />
        //             <div className="layer">
        //                 <div className="mb-3 mt-5">
        //                     <h2 style={{ color: 'white', fontSize: '20px' }}>{ideal.title}</h2>
        //                 </div>
        //                 <div style={{ color: 'white', overflow: 'hidden', height: '100px' }}>
        //                     <p>{ideal.content}</p>
        //                 </div>
        //             </div>
        //         </div>
        //     ))}
        // </Container>
    );
};

export default Trend;
