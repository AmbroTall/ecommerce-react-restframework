import React,{useEffect} from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {deleteProd, productFetch} from '../../redux/apiCalls'

const ProductDataTable = () => {
    const productColumns = [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "name",
          headerName: "ProductName",
          width: 150,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                {/* <img className="cellImg" src={params.row.img} alt="avatar" /> */}
                {params.row.name}
              </div>
            );
          },
        },
        {
          field: "desc",
          headerName: "Description",
          width: 230,
        },
      
        {
          field: "img",
          headerName: "ProdImg",
          width: 100,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <img className="cellImg" src={params.row.img} alt="avatar" />
                {/* {params.row.username} */}
              </div>
            );
          },
        },
        // {
        //   field: "status",
        //   headerName: "Status",
        //   width: 160,
        //   renderCell: (params) => {
        //     return (
        //       <div className={`cellWithStatus ${params.row.status}`}>
        //         {params.row.status}
        //       </div>
        //     );
        //   },
        // },
        {
            field: "created_at",
            headerName: "Status",
            width: 160,
          },
      ];
    

    const products = useSelector(state=>state.products)
    
    const dispatch = useDispatch()

    useEffect(()=>{
        productFetch(dispatch)
    },[dispatch])

    const handleDelete = (id) => {
      deleteProd(dispatch, id)
    };
  
    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <Link to={"/products/"+params.row.id} style={{ textDecoration: "none" }}>
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
          Add New Product
          <Link to="/products/new" className="link">
            Add New
          </Link>
        </div>
        <DataGrid
          className="datagrid"
          rows={products}
          columns={productColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    );
}

export default ProductDataTable