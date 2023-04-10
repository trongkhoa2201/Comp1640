
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "../Dashboard/Dashboard.css"
import { Container } from 'react-bootstrap';
import Chart from 'chart.js/auto';


const Dashboard = () => {


    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/posts');
            setPosts(result.data);
        };
        fetchData();
    }, []);
    
    const data = posts.map((post) => {
        return {
            title: post.title,
            views: post.views,
            likes: post.likes,
            dislike: post.dislike,
        };
    });

    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/departments');
            setDepartments(result.data);
        };
        fetchData();
    }, []);
    
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/topics');
            setTopics(result.data);
        };
        fetchData();
    }, []);
    
    
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/api/users');
            setUsers(result.data);
        };
        fetchData();
    }, []);
    
    console.log("user", users)
   
useEffect(() => {
    async function fetchData() {
        const response = await fetch('/api/users/departmentCount');
        const departmentCounts = await response.json();

        const labels = departmentCounts.map((department) => department._id);
        const data = departmentCounts.map((department) => department.count);

        const ctx = document.getElementById('department-chart').getContext('2d');
        // ... code vẽ biểu đồ ở đây
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#00CC99', '#990099', '#FF9900', '#CCCCCC'],
                    },
                ],
            },
        });
    }

    fetchData();
}, []);

    return (
        <Container>
            <div>
                <div className="DashNumber  mb-4 gap-3 ">
                    <div className="box">
                        <h4>total User : {departments.length} </h4>
                    </div>
                    <div className="box">
                        <h4>total Post : {posts.length} </h4>
                    </div>
                    <div className="box">
                        <h4>total Topic : {topics.length} </h4>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <canvas style={{maxWidth:"400px", maxHeight:"400px"}} id="department-chart"></canvas>
            </div>

            {/* <BarChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="views" fill="#8884d8" />
                    <Bar dataKey="likes" fill="#82ca9d" />
                </BarChart> */}
            {/* =================================================================== */}
            {/* <BarChart width={600} height={300} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="dislike" fill="#8884d8" />
                    <Bar dataKey="likes" fill="#82ca9d" />
                </BarChart> */}
        </Container>
    );
};

export default Dashboard