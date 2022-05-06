import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import {useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import React,{useState} from 'react'

const Single = () => {

  const productId = useLocation().pathname.split("/")[2]
  const id = parseInt(productId)
  const product = useSelector((state)=> state.products.find((product)=>product.id === id))
  const [logo, setLogo] = useState("")
  const [update, setUpdate] = useState(false)

  
  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            
            <div className="editButton" onClick={()=>setUpdate(true)}>Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
            {
             logo?
              <img
                src={URL.createObjectURL(logo)}
                alt=""
                className="itemImg"
              />:

              <img
                src={product.img}
                alt=""
                className="itemImg"
              />
            }

              {update ?
              <div className="details">
                <div>
                  <label htmlFor='fileInput'>
                    <p style={{cursor: "pointer"}}>Add Image</p>
                  </label>
                  <input type="file" id="fileInput" style={{display:"none"}} onChange={(e)=>setLogo(e.target.files[0])} />
                </div>
                <input type='text' placeholder={product.name} />
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">{product.id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">{product.created_at}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">
                    pending
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
                <button>Update</button>
              </div>

              :

              <div className="details">
                <h1 className="itemTitle">{product.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">{product.id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Created At:</span>
                  <span className="itemValue">{product.created_at}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">
                    pending
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>

              }
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default Single;
