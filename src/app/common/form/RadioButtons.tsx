import React, { useState } from "react";
import { Form, Input, Label, Radio } from "semantic-ui-react";
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
export default function RadioButtons(prop:Props){

    function getOptions(){
        var list : Item[] = new Array(prop.OptionList.length)
        for(let i =0; i<prop.OptionList.length; i++){
            var _item:Item = {key:prop.OptionList[i], text:prop.OptionList[i], value:prop.OptionList[i]}
            list[i]= _item;
        }
        return list;
    }


    var _buttons: any[] = new Array(prop.OptionList.length)
    const[selection, setSelection] = useState(prop.DefultValue)
    
    function getRadioButtons(){
       
        for(let i = 0; i< prop.OptionList.length; i++){
            
            var _item = <Form.Field 
                key={i}
                control={Radio}
                label={prop.OptionList[i]}
                value={prop.OptionList[i]}
                checked={prop.OptionList[i] === selection}
                onChange={()=>{
                    setSelection(prop.OptionList[i])
                    prop.onchange(prop.FieldName, prop.OptionList[i])
                }
            }

            />
            _buttons[i]= _item;

        }
        return _buttons;
    }

   

    return(
        <Form.Field inline>
           <Label>{prop.FieldName}</Label>
           <Form.Group inline style={{marginTop:"10px", marginLeft:"5px"}}>
           {getRadioButtons()}
           </Form.Group>
          
        </Form.Field>
    )

}