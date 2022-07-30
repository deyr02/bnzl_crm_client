import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Table } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";

interface Props{
    activity: Activity
}


export default observer( function ActivityRow(prop:Props){
    const{activityStore} = useStore();
    return(
        <Table.Row>
            <Table.Cell>{prop.activity.Properties[0].value}</Table.Cell>
            <Table.Cell>{prop.activity.CreatedAT}</Table.Cell>
            <Table.Cell>{prop.activity.CreatedBy}</Table.Cell>
            <Table.Cell> <Button icon='file' /></Table.Cell> 
        </Table.Row>
    )
})




