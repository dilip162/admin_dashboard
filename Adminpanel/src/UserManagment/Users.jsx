import * as React from 'react';
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import api from '../utils/intercepter';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


  
  
  
  
  const Users =() =>{
    const navigate = useNavigate()
    const columns = [
        { field: 'userId', headerName: 'User ID', width: 70 },
        { field: 'fname', headerName: 'First name', width: 90 },
        { field: 'username', headerName: 'Username', width: 90 },
        { field: 'email', headerName: 'Email ID', width: 150 },  
        { field: 'role', headerName: 'Roles', width: 80 },
        { field: 'gender', headerName: 'Gender', width: 80 },
        { field: 'created_date', headerName: 'Created_Date', type: "number", width: 130 },
        { field: 'action', headerName: 'Action', width: 190, renderCell:(params)=> {return  (<div><Button onClick={(e)=>handleView(e,params.row.userId)}>{<VisibilityIcon/>}</Button><Button onClick={(e)=>handleEdit(e,params.row.userId)}>{<EditIcon/>}</Button> {params.row.userId!=1?<Button onClick={(e)=>handleDelete(e,params.row.userId)}>{<DeleteIcon/>}</Button>:""}</div>) }},
        
      ];
    const paginationModel = { page: 0, pageSize: 10 };
    const [getUsers, setUsers] = useState([]);

    const handleView = (e,id)=>{
        e.stopPropagation();
        navigate(`/admin/viewuser/${id}`)
    };
    const handleEdit = (e,id)=>{
        e.stopPropagation();
        navigate(`/admin/edituser/${id}`)
    };
    const handleDelete = (e,id)=>{
        try {
            if (window.confirm("Are you sure?")) {
              api.delete(`user/delete/${id}`).then((data) => {
                if (data.data.success) {
                    api.get("user/getall").then((response) => {
                        setUsers(response.data.data);
                    });
                  }
              });
            }
          } catch (error) {
            console.log(error);
          }
    };

    

    React.useEffect (() => {
        let mounted = true;
        getUsersList().then(function (response) {    
          // handle success
          if(mounted) {
            
            setUsers(response.data.data);
            console.log(response.data.data);
          }
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        })
        return () => mounted = false;
      },[])
      const getUsersList = ()=>{
        return api.get('user/getall');
         
       }
    return(
        <>
        <div className='users'>
      <h1>Users<Paper sx={{ height: 400, width: '100%' }}>
        
      <DataGrid
      
        rows={getUsers}
        
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper></h1>
    </div>
        </>
    )
}

export default Users;