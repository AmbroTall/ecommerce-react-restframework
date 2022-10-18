import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { addProd } from "../../redux/apiCalls";
import {useDispatch} from 'react-redux'
import {FormControl ,InputLabel,Select,MenuItem,TextField} from '@mui/material'
import axios from "axios";

const NewProduct = () => {
  const [file, setFile] = useState("");
  const [dbColor, setDbColor] = useState([])
  const [dbSize, setDbSize] = useState([])
  const [inputs, setInput] = useState({})
  const [colors, setColors] = useState([])
  const [cat, setCat] = useState([])
  const [sizes, setSizes] = useState([])
  
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchColor= async ()=>{
      const res = await axios.get('http://127.0.0.1:8000/colors/')
      setColors(res.data)
      // console.log(res.data)
    }
    const fetchCat = async ()=>{
      const res = await axios.get('http://127.0.0.1:8000/sizes/')
      setSizes(res.data)
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

  const product = {
    ...inputs,img:file,color:dbColor,size:dbSize
  }
  console.log(dbSize, dbColor)
  const handleCreate = (e)=>{
    e.preventDefault()
    addProd(dispatch, product)
    // window.location.replace('/products')
  }
  
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
          
              <div className="formInput">
                <label>Product Name</label>
                <TextField sx={{marginTop:'15px'}} id="filled-basic" placeholder={product.title} variant="filled" name="title" onChange={handleUpdate}/>
              </div>

              <div className="formInput">
                <label>Categories</label>
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

              <div className="formInput">
                <label>Size</label>
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
                      {sizes.map((siz) => (
                        <MenuItem key={siz.size} value={siz.size}>{siz.size}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </div>

              <div className="formInput">
                <label>Color</label>
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
                      {colors.map((color) => (
                        <MenuItem key={color.color_name} value={color.color_name}>{color.color_name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
              </div>

              <div className="formInput">
                <label>Price</label>
                <input type='number' name="price" placeholder={product.price} onChange={handleUpdate}/>
              </div>

              <button onClick={handleCreate}>Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
