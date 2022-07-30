import React from "react";
import { Form, Label, Select } from "semantic-ui-react";

interface Props{
    Placeholder:string,
    FieldName: string,
    Type?:string,
    OptionList: string[],
    DefultValue: string,
    onchange:any
}
interface Item{
    key:string,
    text:string,
    value:string
}

export default function DropDownList(prop:Props){

    function getOptions(){
        var list : Item[] = new Array(prop.OptionList.length)
        for(let i =0; i<prop.OptionList.length; i++){
            var _item:Item = {key:prop.OptionList[i], text:prop.OptionList[i], value:prop.OptionList[i]}
            list[i]= _item;
        }
        return list;
    }

    return(
        <Form.Field>
            <Label>{prop.FieldName}</Label>
            <Select options={getOptions()} defaultValue ={prop.DefultValue}  onChange={(e:any, {value}) => prop.onchange(prop.FieldName, value?.toString())} />
        </Form.Field>
    )
}