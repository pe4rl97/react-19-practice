import { memo } from "react"
import products from "../data/data"
import SlowProduct from "./SlowProduct"

const Products = () => {
    const productsList = products.map((product) => (
        <SlowProduct key={product.id} product={product}/>
    )) 

    return (
        <>
            <h1>Products page</h1>
            <ul>{productsList}</ul>
        </>
    )
}

export default memo(Products)