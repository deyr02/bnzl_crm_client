import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Header, Icon, Table } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
import ActivityRow from "./ActivityRow";
import { history } from "../../..";
import ActivityReport from "../report/ActivityReport";



export default observer( function ActivityDashBoard(){
    const{activityStore}= useStore();
    const{loadingActivities, activityRegistry} = activityStore;
    const[selectedActicity, setSelectedActivity]= useState<Activity|null>(null);

    function handleSelectedActivity(activity:Activity){
      setSelectedActivity(activity);
      
    }

    function renderActivityRows(){
       var output  = new Array(activityRegistry.size)
       activityRegistry.forEach(ele =>{
        var _ele = <ActivityRow
         key={ele.ActivityID} 
         activity={ele}
         viewActivity={()=>handleSelectedActivity(ele)}
         />;
        output.push(_ele);
       })
       return output;

    }


    useEffect(()=>{
        if(activityRegistry.size <=1) loadingActivities()
        }, [activityRegistry.size, loadingActivities])
        


    return(
        <>
            {
                selectedActicity?(<ActivityReport activity={selectedActicity!}/>):(
                    <>
                    <Header as ="h1">Activity Dashboard</Header>
                    <div>
                        <Button as={NavLink} to="/activity/create" primary><Icon name="pencil"></Icon> Create Activity</Button>
                        <Button as={NavLink} to="/activity/createv2" color='twitter'><Icon name="pencil"></Icon> Create Activity (option-2)</Button>
                    </div>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Activity Name</Table.HeaderCell>
                                <Table.HeaderCell>Created At</Table.HeaderCell>
                                <Table.HeaderCell>Owner</Table.HeaderCell>
                                <Table.HeaderCell></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {renderActivityRows()}
                        </Table.Body>
                     </Table>
                    </>
                )
            }
        </>

       
        
    )
})