import {productStart, productSuccess, productFailure, updateProduct,updateProductSuccess,updateProductFailure, addProduct,addProductSuccess,addProductFailure,deleteProduct,deleteProductSuccess,deleteProductFailure} from './ProductSlice'
import axios from 'axios'

// Get All
export const productFetch =async(dispatch)=>{
    dispatch(productStart())
    try{
        const res = await axios.get('http://127.0.0.1:8000/all/products/')
        console.log(res)
        dispatch(productSuccess(res.data))
    }catch(err){
        console.log(err)
        dispatch(productFailure())
    }
}

// Update
export const updateProd =async(id, dispatch, product)=>{
    dispatch(updateProduct())
    try{
        // const res = await axios.put(`http://127.0.0.1:8000/product/update/${id}`)
        // console.log(res)
        dispatch(updateProductSuccess({id, product}))
    }catch(err){
        console.log(err)
        dispatch(updateProductFailure())
    }
}

// Create
export const addProd =async(dispatch, product)=>{
    dispatch(addProduct())
    try{
        const res = await axios.post(`http://127.0.0.1:8000/product/`, {product})
        // console.log(res)
        dispatch(addProductSuccess(res.data))
    }catch(err){
        console.log(err)
        dispatch(addProductFailure())
    }
}

// Delete
export const deleteProd =async(dispatch, id)=>{
    dispatch(deleteProduct())
    try{
        const res = await axios.delete(`http://127.0.0.1:8000/product/delete/${id}`)
        console.log(res)
        dispatch(deleteProductSuccess(id))
    }catch(err){
        console.log(err)
        dispatch(deleteProductFailure())
    }
}