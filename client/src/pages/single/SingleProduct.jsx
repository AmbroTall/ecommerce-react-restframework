import "./single.scss";
import {Button, FormControl ,InputLabel,Select,MenuItem,TextField} from '@mui/material'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import {useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import React,{useEffect, useState} from 'react'
import { updateProd } from "../../redux/apiCalls";
import axios from "axios";

const Single = () => {
  const productId = useLocation().pathname.split("/")[2]
  const id = parseInt(productId)
  const product = useSelector((state)=> state.product.products.find((product)=>product.id === id))
  const [logo, setLogo] = useState("")
  const [dbColor, setDbColor] = useState([])
  const [dbSize, setDbSize] = useState([])
  const [inputs, setInput] = useState({})
  const [color, setColor] = useState([])
  const [cat, setCat] = useState([])
  const [size, setSize] = useState([])
  const [update, setUpdate] = useState(false)
  const dispatch = useDispatch()


 
  const handleEdit =(id)=>{
    // e.preventDefauslt()
    updateProd(id, dispatch, {...inputs,img:logo,color:dbColor,size:dbSize})
    window.location.replace('/products')
  }

  useEffect(()=>{
    const fetchColor= async ()=>{
      const res = await axios.get('http://127.0.0.1:8000/colors/')
      setColor(res.data)
      // console.log(res.data)
    }
    const fetchCat = async ()=>{
      const res = await axios.get('http://127.0.0.1:8000/sizes/')
      setSize(res.data)
      // console.log(res.data)
    }
    const fetchSizes = async ()=>{
      const res = await axios.get('http://127.0.0.1:8000/categories/')
      setCat(res.data)
      // console.log(res.data)
    }

    fetchColor()
    fetchCat()
    fetchSizes()
  },[])

  const handleUpdate = (e) =>{
    setInput(prev =>{
      return {...prev , [e.target.name]:e.target.value}
    })
  }

  const handleColor = (e) =>{
    setDbColor(e.target.value)
  }

  const handleSize = (e) =>{
    setDbSize(e.target.value)
  }
  
  
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
                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                  </label>
                  <input type="file" accept="image/*" id="fileInput" style={{display:"none"}} onChange={(e)=>setLogo(e.target.files[0])} />
                </div>
                <div className="detailItem">
                  <span className="itemKey">Product Name:</span>
                  <TextField sx={{marginTop:'15px'}} id="filled-basic" placeholder={product.title} variant="filled" name="title" onChange={handleUpdate}/>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Categories:</span>
                  <FormControl variant="filled" sx={{ mt: 2, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Select Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={inputs.cat}
                      onChange={handleUpdate}
                      name="cat"
                    >
                      {cat.map((cat) => (
                        <MenuItem key={cat.prod_cat} value={cat.prod_cat}>{cat.prod_cat}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Size</span>
                  <FormControl variant="filled" sx={{ mt: 2, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label" >Select Size</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={dbSize}
                      onChange={handleSize}
                      multiple
                      name="size"
                    >
                      {size.map((siz) => (
                        <MenuItem key={siz.size} value={siz.size}>{siz.size}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Color</span>
                  <FormControl variant="filled" sx={{ mt: 2, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-filled-label">Select Color</InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={dbColor}
                      onChange={handleColor}
                      name="color"
                      multiple
                    >
                      {color.map((color) => (
                        <MenuItem key={color.color_name} value={color.color_name}>{color.color_name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price $:</span>
                  <input type='number' name="price" placeholder={product.price} onChange={handleUpdate}/>
                </div>
                <Button variant="contained" color="success" sx={{marginTop:'15px'}} onClick={()=>handleEdit(product.id)}>Update</Button>
              </div>

              :

              <div className="details">
                <h1 className="itemTitle">{product.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Categories:</span>
                  <span className="itemValue">{product.cat}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Sizes:</span>
                  <span className="itemValue">
                  {product.size.map(x=>(
                    x.size+", "
                  ))}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Colors:</span>
                  <span className="itemValueColors">
                    {product.color.map(x=>(
                      <div key={x.color_name} className={`color ${x.color_name}`}></div>
                    ))}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">$ {product.price}</span>
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
