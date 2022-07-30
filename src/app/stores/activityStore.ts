import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/Activity";
import { CustomFieldElement } from "../models/CustomFieldElement";

export interface GetAllActivityResponse{
    data: GetAllActivity
}

interface GetAllActivity{
    GetAllActivity: Activity[]
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
    activityRegistry= new Map<string, Activity>();
    activityMetaRegistry= new Map<string, CustomFieldElement>();
    loadingInitial = false;

    loadingMetaIniial=false;

    constructor(){
        makeAutoObservable(this)
        reaction(
            ()=>{this.activityRegistry.keys();},
            ()=>{
                this.activityRegistry.clear();
                this.loadingActivities();
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
          
            console.log(result.data.GetAllActivity);
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
            
        }catch(error){
            console.log(error);
          
        }
        
    }
}