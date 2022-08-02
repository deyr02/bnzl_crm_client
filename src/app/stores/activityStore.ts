import { makeAutoObservable, reaction, runInAction } from "mobx";
import { json } from "stream/consumers";
import agent from "../api/agent";
import { Activity } from "../models/Activity";
import { CustomFieldElement } from "../models/CustomFieldElement";
import { errorResponse } from "./userStore";

export interface GetAllActivityResponse{
    data: GetAllActivity
}

interface GetAllActivity{
    GetAllActivity: Activity[]
}


export interface GetActivityResponse{
    data: GetActivityByID|null;
}

interface GetActivityByID{
    GetActivityByID: Activity|null;
}





export interface GetMetaActivityCollectionResponse{
    data: GetMetaActivityCollection;
}

interface GetMetaActivityCollection{
    GetMetaActivityCollection: Fields;
}

interface Fields{
    Fields:CustomFieldElement[];
}








export default class ActivityStore{
    activityRegistry = new Map<string, Activity>();
    selectedActivityRecord: Activity|null = null;
    
    activityMetaRegistry= new Map<string, CustomFieldElement>();
    loadingInitial = false;

    loadingMetaIniial=false;

    constructor(){
        makeAutoObservable(this)
        reaction(
            ()=>{this.activityRegistry.keys();},
            ()=>{
               // this.activityRegistry.clear();
                this.loadingActivities();
                this.loadSelectedActivity();
            }
        )
    }

    loadingActivities = async() => {
        this.loadingInitial = true;
        try{
            const result = await agent.Activities.list(`query=query GetAllActivity{
                GetAllActivity{
                  ActivityID
                  CreatedAT
                  UpdatedAT
                  CreatedBy
                  ModifiedBy
                  DeletedAT
                  Properties{
                    key
                    DataType
                    value
                  }
                }
              }`);
            
         runInAction(()=>{
            result.data.GetAllActivity.forEach(activity => {
                this.activityRegistry.set(activity.ActivityID, activity);
            });
          
           
            this.loadingInitial=false;
         })
           
           
        }catch(error){
            console.log(error);
           // this.setLoadingInitial(false);            

        }
    }

    loadingMetaActivityFileds = async() => {
        this.loadingMetaIniial = true;
        try{
            const result = await agent.Activities.FormFileds(`query=query GetMetaActivityCollection{
                GetMetaActivityCollection{
                  Fields{
                    FieldID
                    FieldName
                    DataType
                    FieldType
                    IsRequired
                    Visibility
                    SystemFieled
                    MaxValue
                    MinValue
                    DefaultValue
                    PossibleValues
                    FieldOrder
                  }
                }
              }`);
         runInAction(()=>{
            if (result.data.GetMetaActivityCollection ){
                result.data.GetMetaActivityCollection.Fields.forEach(field => {
                    this.activityMetaRegistry.set(field.FieldID, field);
                });
            }
            
          
            console.log(result.data.GetMetaActivityCollection);
            this.loadingMetaIniial=false;
         })
           
           
        }catch(error){
            console.log(error);
           // this.setLoadingInitial(false);            

        }
    }

    createActivity = async (activityFormCollection:{})=>{
      
        try{
            await agent.Activities.create(activityFormCollection);
            return true;
            
        }catch(error){
            console.log(error);
            return false;
          
        }  
    }


     loadSelectedActivity = async() => {
       // get all search params (including ?)
        const queryString = window.location.search;
        // it will look like this: ?product=shirt&color=blue&newuser&size=m

        // parse the query string's paramters
        const urlParams = new URLSearchParams(queryString);

        // To get a parameter simply write something like the follwing
        const paramValue = urlParams.get('id');
        console.log(paramValue);
        
        if(paramValue){
            let activityResult= await agent.Activities.details(`query=query GetActivityByID{
                GetActivityByID(_id:"${paramValue}"){
                   ActivityID
                  CreatedAT
                  UpdatedAT
                  DeletedAT
                  CreatedBy
                  ModifiedBy
                 
                  Properties{
                    key 
                    DataType
                    value
                  }
                }
              }`)

              if (activityResult.data){
                runInAction(()=>{
                    let _row:GetActivityByID = JSON.parse(JSON.stringify( activityResult.data))
                    this.selectedActivityRecord =_row.GetActivityByID!;
                   console.log(this.selectedActivityRecord)
                })
                
            }
     
        }
    }

    

}