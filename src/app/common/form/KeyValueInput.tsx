import React from "react";
import { Button, ButtonGroup, Form } from "semantic-ui-react";

interface Prop{
    FieldName:string;
    Value:string;
    isFirstField: boolean;
    isLastField:boolean
    NewField:any;
    DeleteField:any;

    onchange:any;
}

export default function KeyValueInput(prop:Prop){
    return(
        <Form.Group >
            <Form.Input 
            width={4} 
          
        
            onChange={e => !prop.isFirstField?prop.onchange("key", e.target.value):()=>{}}  
            value={prop.FieldName} 
            fluid label='Field Name' 
            required 
            placeholder='Field Name ' />
            
            <Form.Input 
            width={10} 
            onChange={e => prop.onchange("value", e.target.value)}  
            value= {prop.Value} 
            fluid 
            label='Value' 
            placeholder='value' />
            <div style={{display:"flex", margin:"25px 10px 10px"}} >
             
             {
                prop.isLastField?
                (
                <Button 
                onClick={prop.NewField} 
                circular color="linkedin" 
                icon="plus"/>)
                :(<></>)
             }
                
            
            
            {
                !prop.isFirstField?
                (
                <Button  
                onClick={prop.DeleteField} 
                circular 
                color="google plus" 
                icon="delete"/>)
                :(<></>)

            }  
            </div>


      </Form.Group>
    )
   
}