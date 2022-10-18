import "./datatable.scss";
import React,{useEffect} from 'react'
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {deleteProd, productFetch} from '../../redux/apiCalls'

const ProductDataTable = () => {
    const productColumns = [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "title",
          headerName: "ProductName",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <img className="cellImg" src={params.row.img} alt="avatar" />
                {params.row.title}
              </div>
            );
          },
        },
        {
          field: "cat",
          headerName: "Category",
          width: 100,
        },
        {
          field: "size",
          headerName: "Sizes available",
          width: 300,
          renderCell: (params) => {
            return (
              <div>
                {params.row.size.map(x=>(
                  x.size+", "
                ))}
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
          field: "color",
          headerName: "Colors available",
          width: 200,
          renderCell: (params) => {
            return (
              <div style={{display:"flex"}}>
                {params.row.color.map(x=>(
                  <div key={x.color_name} className={`color ${x.color_name}`}></div>
                ))}
              </div>
            );
          },
        },
        // {
        //     field: "color",
        //     headerName: "Color",
        //     width: 160,
        // },
        {
            field: "price",
            headerName: "Price",
            width: 160,
            renderCell: (params) => {
              return (
                <div>
                  $ {params.row.price}
                </div>
              );
            },
          },
        { field: "created_at", headerName: "Created_at", width: 70 },
      ];
    
    const products = useSelector(state=>state.product.products)
    
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