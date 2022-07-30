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
export default function NumberInput(prop:Props){
    return(
        <Form.Field>
            <Label>{prop.FieldName}</Label>
            <input onChange={(event)=> prop.onchange(prop.FieldName, event.target.value) } type={prop.Type} name={prop.FieldName} required={prop.isrequired} max={prop.max} min={prop.min} placeholder={prop.Placeholder} ></input>
        </Form.Field>
    )
}