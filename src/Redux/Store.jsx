import { configureStore } from "@reduxjs/toolkit";
import  ProductSlice  from "./Slices/ProductSlice";

const Store = configureStore({
    reducer : {
        productData : ProductSlice
    }
});

export default Store;