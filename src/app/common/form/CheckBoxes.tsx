import React, { useState } from "react";
import { Checkbox, Form, Label } from "semantic-ui-react";

interface Props{
    Placeholder:string,
    FieldName: string,
    Type?:string,
    OptionList: string[],
    DefultValue: string,
    onchange:any
}
interface Item{
    key:any,
    value:string,
    isChecked:Boolean
}

export default function CheckBoxes(prop:Props){

    var _buttons: any[] = new Array(prop.OptionList.length)
    var SelectedItems: Item[] = new Array(prop.OptionList.length)
  

    function handleCheck(index:any){
      SelectedItems[index].isChecked = !SelectedItems[index].isChecked    
    }

    function getSelections(){
        var output:string= "";
        for(let i = 0; i< SelectedItems.length; i++){
            if(SelectedItems[i].isChecked){
                output = output + SelectedItems[i].value;
                if(i < SelectedItems.length-1){
                    output = output + ",";
                 }
            }
             
        }
        return output;
    }

    function getCheckBoxes(){
        for(let i = 0; i< prop.OptionList.length; i++){
            
            var _item = <Form.Field 
                key={i}
                control={Checkbox}
                label={prop.OptionList[i]}
                value={prop.OptionList[i]}
                onChange={()=>{
                   //console.log(prop.OptionList[i])
                    //prop.onchange(prop.OptionList[i])
                    handleCheck(i)
                    console.log(getSelections())
                }
            }
            />
            _buttons[i]= _item;
            SelectedItems[i]={key:i, value: prop.OptionList[i], isChecked:false}
            
        }
        return _buttons;
    }
    return(
        <Form.Field inline>
            <Label>{prop.FieldName}</Label>
            <div style={{marginLeft:"5px", marginTop:"10px"}}>
                {getCheckBoxes()}
            </div>
        </Form.Field>
    )
}