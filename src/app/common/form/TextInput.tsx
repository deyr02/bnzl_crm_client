
import React from "react";
import { Form, Label } from "semantic-ui-react";

interface Props{
    Placeholder:string,
    FieldName: string,
    Type?:string,
    max: number,
    min: number,
    isrequired: boolean,
    onchange:any
}


export default function TextInput(prop:Props){
    return(
        <Form.Field>
            <Label>{prop.FieldName}</Label>
            <input onChange={(event)=> prop.onchange(event.target.value) } type={prop.Type} maxLength={prop.max} minLength={prop.min} name={prop.FieldName} required={prop.isrequired} placeholder={prop.Placeholder} ></input>
        </Form.Field>
    )
}


