import { configureStore } from "@reduxjs/toolkit";
import guidesReducer from "../redux/slices/guideSlice";


const store=configureStore({
    reducer:{
        guides:guidesReducer,
       
    }
});

export default store