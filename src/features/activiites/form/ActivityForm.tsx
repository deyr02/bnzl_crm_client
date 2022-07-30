import React, { useEffect, useState } from "react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import CheckBoxes from "../../../app/common/form/CheckBoxes";
import DateInput from "../../../app/common/form/DateInput";
import DoubleInput from "../../../app/common/form/DoubleInput";
import DropDownList from "../../../app/common/form/DropDownList";
import NumberInput from "../../../app/common/form/NumberInput";
import RadioButtons from "../../../app/common/form/RadioButtons";
import TextInput from "../../../app/common/form/TextInput";
import { useStore } from "../../../app/stores/store";

export default function ActivityForm(){
    function handleSubmit(values:any){
        console.log(activityname)
    }
    const[activityname , setactivityName] = useState('')
    
    const OptionList: string[] = ["one","two", "three", "four"]

    function setActivity(values:string){
        setactivityName(values)
    }
    const {activityStore} = useStore();
    const {loadingMetaActivityFileds} = activityStore;
    useEffect(()=>{
        loadingMetaActivityFileds();
    },[loadingMetaActivityFileds])

    return(
        <Segment style={{padding:"50px"}} >
        <Header content="Activity Form"></Header>

         <Form onSubmit={values=> handleSubmit(values)} >
            <TextInput onchange={setActivity}  FieldName="ActivityName" max={20} min={5} isrequired={true} Placeholder="input Activity Name" Type="text" />
            <NumberInput onchange={setActivity}  FieldName="NumberInput" max={20} min={5} isrequired={true} Placeholder="input a number" Type="number" />
            
            
            <DoubleInput onchange={setActivity}  FieldName="DoubleInput" max={20} min={5} isrequired={true} Placeholder="input a Double" Type="number" />
            <DropDownList Placeholder="Select a option" FieldName="DropdownList" Type="String" OptionList = {OptionList} DefultValue= "one" onchange={setActivity}/>
            
            <RadioButtons Placeholder="Select a option" FieldName="RadioButtons" Type="String" OptionList = {OptionList} DefultValue= "one" onchange={setActivity}/>
            <CheckBoxes Placeholder="Select a option" FieldName="CheckBoxes" Type="String" OptionList = {OptionList} DefultValue= "one" onchange={setActivity}/>
             <DateInput 
             Placeholder="Select a date"
             FieldName="Date"
             Type="String"
             onchange={setActivity}

             isrequired={true}/>
           
            
            <Button  style={{marginBottom:"20px"}}
                      
                        floated='right' 
                        positive 
                        type = "submit" 
                        content = "Submit" 
                        
                    />
        
        </Form>
        </Segment>
       
    )
}