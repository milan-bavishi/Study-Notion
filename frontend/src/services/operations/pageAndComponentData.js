import {toast} from "react-hot-toast"
import { setProgress } from "../../slices/loadingBarSlice";
import { apiConnector } from '../apiConnector';
import { catalogData } from '../apis';

export const getCatalogaPageData = async (categoryId,dispatch) => {

    dispatch(setProgress(50));
    let result = [];

    try{
        const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API,{
            categoryId: categoryId,
        });
        console.log("Catalog Page Data API Response...",response);
        if(!response.data.success){
            throw new Error("Could Not Fetch category Page data error...",response);
        }
        result = response?.data;
    }catch(error){
        console.log("Catalog Page data API Error....",error);
        toast.error("No Course Added to this category yet");
        result = error.response?.data;
    }
    dispatch(setProgress(100));
    return result;
}