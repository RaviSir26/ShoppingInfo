import { createSlice } from "@reduxjs/toolkit";


export const ProductSlice = createSlice({

    name : "CART",

    initialState : {
        cartData : []
    },

    reducers : {
        addToCart : (state, action)=>{
            let findIndexValue = state.cartData.findIndex((itemValue)=> itemValue.id === action.payload.id);

           if(findIndexValue >= 0){
                state.cartData[findIndexValue].quantity += 1;
           }
           else{
            const newData = {...action.payload, quantity : 1};
            state.cartData = [...state.cartData, newData]
           }  
        },
        removeToCart : (state, action)=>{
            let itemData = state.cartData.filter((itemsId)=> itemsId.id !== action.payload);
            state.cartData = itemData;
        },
        oneRemoveToCart : (state, action)=>{
            let findIndexValue = state.cartData.findIndex((itemValue)=> itemValue.id === action.payload.id);

           if(findIndexValue >= 0){
                state.cartData[findIndexValue].quantity -= 1;
           }
          
        },
    }

});

export default ProductSlice.reducer;
export const{ addToCart , removeToCart, oneRemoveToCart} = ProductSlice.actions;