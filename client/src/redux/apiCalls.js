import {productStart, productSuccess, productFailure, updateProduct,updateProductSuccess,updateProductFailure, addProduct,addProductSuccess,addProductFailure,deleteProduct,deleteProductSuccess,deleteProductFailure} from './ProductSlice'
import {userStart, userSuccess, userFailure, deleteUser,deleteUserSuccess,deleteUserFailure} from './userSlice'
import axios from 'axios'


const userReq = axios.create({
    headers:{
        'Content-Type':'multipart/form-data',
        accept:'application/json'
    }
})
// Get All products
export const productFetch =async(dispatch)=>{
    dispatch(productStart())
    try{
        const res = await axios.get('http://127.0.0.1:8000/all/products/')
        // console.log(res)
        dispatch(productSuccess(res.data))
    }catch(err){
        console.log(err)
        dispatch(productFailure())
    }
}

// Update
export const updateProd = async(id, dispatch, product)=>{
    dispatch(updateProduct())
    try{
        const res = await userReq.put(`http://127.0.0.1:8000/product/update/${id}`, product)
        console.log(res)
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
        const res = await userReq.post("http://127.0.0.1:8000/product/create/", product)
        console.log(res)
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
        await axios.delete(`http://127.0.0.1:8000/product/delete/${id}`)
        // console.log(res)
        dispatch(deleteProductSuccess(id))
    }catch(err){
        console.log(err)
        dispatch(deleteProductFailure())
    }
}


// Get All Users
export const userFetch =async(dispatch)=>{
    dispatch(userStart())
    try{
        const res = await axios.get('http://127.0.0.1:8000/all-users/')
        // console.log(res)
        dispatch(userSuccess(res.data))
    }catch(err){
        console.log(err)
        dispatch(userFailure())
    }
}

// Delete user
export const delUser =async(dispatch, id)=>{
    dispatch(deleteUser())
    try{
        await axios.delete(`http://127.0.0.1:8000/delete_user/${id}/`)
        // console.log(res)
        dispatch(deleteUserSuccess(id))
    }catch(err){
        console.log(err)
        dispatch(deleteUserFailure())
    }
}