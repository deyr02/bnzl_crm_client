
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Activity } from '../models/Activity';
import { CustomFieldElement } from '../models/CustomFieldElement';
import { GetAllActivityResponse, GetMetaActivityCollectionResponse } from '../stores/activityStore';

import { store } from "../stores/store";

const sleep = (delay:number) =>{
    return new Promise ((resolve)=>{
        setTimeout(resolve, delay);
    })
}




axios.defaults.baseURL = "http://127.0.0.1:8090";

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers!.Authorization = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcnlkYXRlIjoiMjAyMi0wNy0yNiAxNDo0OToyOS4xNjc4NDg5ICsxMjAwIE5aU1QgbT0rODgwMjUuMzQ2MzQ3NjAxIiwicm9sZWlkIjoiMTExMTExMTExMTExMTExMTExMSIsInVzZXJuYW1lIjoiYm56bF9hZG1pbiJ9.6I__9z98YvZkHCOWBbkJit1PLz-wH9uCIey458M_ZIc`    
    //`${token}`
    return config;
})
axios.defaults.headers.common = {'Authorization': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcnlkYXRlIjoiMjAyMi0wNy0yNiAxNDo0OToyOS4xNjc4NDg5ICsxMjAwIE5aU1QgbT0rODgwMjUuMzQ2MzQ3NjAxIiwicm9sZWlkIjoiMTExMTExMTExMTExMTExMTExMSIsInVzZXJuYW1lIjoiYm56bF9hZG1pbiJ9.6I__9z98YvZkHCOWBbkJit1PLz-wH9uCIey458M_ZIc`}

axios.interceptors.response.use(async response =>{
    if(process.env.NODE_ENV === 'development') await sleep(1000);

    return response;
   
}, (error:AxiosError) =>{
    const{data, status, config, headers} = error.response!;
    switch (status){
        case 400:
            if(typeof data === 'string'){
                toast.error(data);
            }
           // toast.error('bad request');
        //    if(config.method === 'get' &&   data.errors.hasOwnProperty('id')){
        //        history.push('/not-found');
        //    }
        //     if(data.errors){
        //         const modalStateErrors = [];
        //         for(const key in data.errors){
        //             if(data.errors[key]){
        //                 modalStateErrors.push(data.errors[key]);
        //             }
        //         }
        //         throw modalStateErrors.flat();
        //     }
        //     else{
        //         toast.error(data);
        //     }

            break;
        case 401:
            if (status === 401 && headers['www-authenticate']?.startsWith('Bearer error="invalid_token"')) {
                toast.error('Session expired - please login again');
            }
            break;
        case 404:
            //history.push("/not-found");
            console.log("Not Found")
            break;
        case 500:
            toast.error('server error');
         //   store.commonStore.setServerError(data);
           // history.push('/server-error');
           console.log("Server error")
            break;
    }

    return Promise.reject(error);
})

const responseBody = <T,> (response: AxiosResponse<T>) => response.data;
const requests = {
    get: <T,>(url:string)=> axios.get<T>(url).then(responseBody),
    post:<T,> (url:string, body:{})=> axios.post<T>(url, body).then(responseBody),
}


const Activities = {
    list: (param:string)=> axios.get<GetAllActivityResponse>(`/activity/getallactivities?${param}`)
        .then(responseBody),

    FormFileds: (param:string)=> axios.get<GetMetaActivityCollectionResponse>(`/activityform/metaactivity?${param}`)
        .then(responseBody),

    create: (activityFormcollection:any)=> requests.post<void>('/activity/', activityFormcollection),

    
}



const agent = {
    Activities,
   // Account,
   // Profiles
}

export default agent;