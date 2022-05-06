import {createSlice} from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: "product",
    initialState :{
        products : [],
        isFetching: false,
        error: false,
    },
    reducers:{
        // Get All Products
        productStart: (state)=>{
            state.isFetching=true
        },
        productSuccess: (state, action)=>{
            state.isFetching=false
            state.products = action.payload
        },
        productFailure: (state)=>{
            state.isFetching=false
            state.error=true
        },

        // Update Product 

        updateProduct: (state)=>{
            state.isFetching=true
        },
        updateProductSuccess: (state, action)=>{
            state.isFetching=false;
            state.products[state.products.findIndex(item=> item.id === action.payload.id)] = action.payload.product
        },
        updateProductFailure: (state)=>{
            state.isFetching=false
            state.error=true
        },

        // Add new Product (Create)

        addProduct: (state)=>{
            state.isFetching=true
        },
        addProductSuccess: (state, action)=>{
            state.isFetching=false;
            state.products.push(action.payload)
        },
        addProductFailure: (state)=>{
            state.isFetching=false
            state.error=true
        },

        // Delete new Product (Delete)

        deleteProduct: (state)=>{
            state.isFetching=true
        },
        deleteProductSuccess: (state, action)=>{
            state.isFetching=false;
            state.products.splice(state.products.findIndex(item => item.id === action.payload))
        },
        deleteProductFailure: (state)=>{
            state.isFetching=false
            state.error=true
        },
        
    }
})

export const {productStart, productSuccess, productFailure, updateProduct,updateProductSuccess,updateProductFailure, addProduct,addProductSuccess,addProductFailure,deleteProduct,deleteProductSuccess,deleteProductFailure} = productSlice.actions
export default productSlice.reducer 