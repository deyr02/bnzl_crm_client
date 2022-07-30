import React from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { Form, Label } from "semantic-ui-react";

interface Props{
    Placeholder:string,
    FieldName: string,
    Type?:string,
    isrequired: boolean,
    onchange:any
}

export default function DateInput(prop:Props){
    return(
        <Form.Field>
        <Label>{prop.FieldName}</Label>
        <div>
        <SemanticDatepicker 
         required={prop.isrequired } showToday
            onChange={(event, data)=>{
                prop.onchange(data.value)
            }
        }/>
        </div>
       

    </Form.Field>
    )
}