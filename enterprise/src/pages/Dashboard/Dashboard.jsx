
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Dashboard = () => {


const [posts, setPosts] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
          const result = await axios.get('/api/posts');
          setPosts(result.data);
      };
      fetchData();
  }, []);

  
const data = posts.map(post => {
  return {
      title: post.title,
      views: post.views,
      likes: post.likes,
      dislike: post.dislike,
  };
});


  return (
      <div>
          <BarChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#8884d8" />
              <Bar dataKey="likes" fill="#82ca9d" />
          </BarChart>
          {/* =================================================================== */}
          <BarChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="dislike" fill="#8884d8" />
              <Bar dataKey="likes" fill="#82ca9d" />
          </BarChart>
      </div>
  );
}

export default Dashboard