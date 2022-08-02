import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props{
    activity: Activity;
    viewActivity:any;
}


export default observer( function ActivityRow(prop:Props){
   
    return(
        <Table.Row>
            <Table.Cell>{prop.activity.Properties[0].value}</Table.Cell>
            <Table.Cell>{prop.activity.CreatedAT}</Table.Cell>
            <Table.Cell>{prop.activity.CreatedBy}</Table.Cell>
            <Table.Cell> 
                <Button 
                    icon='file' 
                    onClick={prop.viewActivity} />
            </Table.Cell> 
        </Table.Row>
    )
})




