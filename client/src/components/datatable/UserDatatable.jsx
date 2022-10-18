import "./datatable.scss";
import React,{useEffect} from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import { delUser,userFetch} from '../../redux/apiCalls'


const UserDatatable = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
      userFetch(dispatch)
    },[dispatch])

    const handleDelete = (id) => {
      delUser(dispatch, id)
    };
    const userColumns = [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "username",
          headerName: "User Name",
          width: 200,
        },
        {
          field: "email",
          headerName: "Email",
          width: 200,
        },
      ]

    const users = useSelector(state=>state.user.users)
    

    
    
    
  
    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link to={"/users/"+params.row.id} style={{ textDecoration: "none" }}>
                <div className="viewButton">View</div>
              </Link>
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            </div>
          );
        },
      },
    ];
    return (
      <div className="datatable">
        <div className="datatableTitle">
          View All Users
        </div>
        <DataGrid
          className="datagrid"
          rows={users}
          columns={userColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    );
}

export default UserDatatable