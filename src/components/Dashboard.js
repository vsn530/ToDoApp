import React, { useState } from 'react';

import Header from './Header';
import Tabs from './Tabs';
import DataGrid from './DataGrid/DataGrid';
import CustomModal from './Modal';

import '../styles/Dashboard.css';

const Dashboard = () =>{
  const [open, setOpen] = useState(false);
  return (
    <div className='container my-5 pt-2 main'>
      <Header/>
      <Tabs/>      
      <DataGrid/>
      <CustomModal type='new' title ='Add New Todo'/>
       
    </div>
  );
}

export default Dashboard;