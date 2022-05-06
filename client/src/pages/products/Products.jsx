import React from 'react'
import ProductDataTable from '../../components/datatable/ProductDataTable'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

const Products = () => {
  return (
    <div className="list">
        <Sidebar />
        <div className="listContainer">
            <Navbar />
            <ProductDataTable />
        </div>
    </div>
  )
}

export default Products