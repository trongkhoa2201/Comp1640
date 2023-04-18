import React from "react";
import "./App.css";
import Layout from '../src/components/Layouts/Layout'
import "bootstrap/dist/css/bootstrap.min.css"
import 'remixicon/fonts/remixicon.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className='App'>
                <ToastContainer position="top-right" limit={1} />

      <Layout />
    </div>
  );
}

export default App;
