import React, { useState } from "react";
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





export default function DoubleInput(prop:Props){
    const[fieldValue, setFieldValue] = useState(0)
    function onDecimalInput(event: any, prop:Props){
        let value = null;
        if (event.target.value) {
            try{
    
                value = parseFloat(event.target.value);
                setFieldValue(value);
                prop.onchange(value);
                
            }
            catch(error){
                console.log(error)
                event.target.vaule = fieldValue;
            }
            
            
    
            // // Test for valid number
            // if ( isNaN(value)) {
            //    // event.setState({showInvalidError: true});
            // } else {
            //     //event.setState({ value: value });
            //    // event.props.onChange(value);
            //     prop.onchange(value)
            //     event.preventDefault()
            //    // event.setState({showInvalidError: false});
                
            // }
        }   
    }

    return(
        <Form.Field>
        <Label>{prop.FieldName}</Label>
        <input onChange={(event)=> onDecimalInput(event, prop) } type={"text"}  max={prop.max} min={prop.min} name={prop.FieldName} required={prop.isrequired} placeholder={prop.Placeholder}  pattern="[+-]?\d+(?:[.,]\d+)?" ></input>
    </Form.Field>
    )
}