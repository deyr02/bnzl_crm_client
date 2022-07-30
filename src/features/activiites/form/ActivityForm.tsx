import { observer } from "mobx-react-lite";
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
import { FieldType } from "../../../app/models/FieldType";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityForm(){
    function handleSubmit(values:any){
        console.log(activityname)
    }
    const[activityname , setactivityName] = useState('')
    const OptionList: string[] = ["one","two", "three", "four"]
    function setActivity(values:string){
        setactivityName(values)
    }






    const {activityStore} = useStore();
    const {loadingMetaActivityFileds, activityMetaRegistry} = activityStore;
    useEffect(()=>{
        loadingMetaActivityFileds().then(()=>renderForm());
    },[loadingMetaActivityFileds])


    function renderForm(){
        var output = new Array(activityMetaRegistry.size);

        activityMetaRegistry.forEach(element => {
            
            switch(element.FieldType){
                case FieldType.TextBox:
                    var item = <TextInput 
                        key={element.FieldID} 
                        Placeholder={`input ${element.FieldName}`}
                        FieldName={element.FieldName}
                        max = {element.MaxValue}
                        min= {element.MinValue}
                        isrequired={element.IsRequired}
                        onchange= {setActivity}
                        />
                    output.push(item);
                    console.log("TextBox");
                    break;



                case FieldType.CheckBoxes:
                    var item = <CheckBoxes
                        key={element.FieldID}
                        Placeholder={`input ${element.FieldName}`}
                        FieldName={element.FieldName}
                        Type={element.DataType}
                        OptionList={element.PossibleValues}
                        DefultValue={element.DefaultValue}
                        onchange= {setActivity}
                    />
                    output.push(item);
                    break;
                
                case FieldType.RadioButtons:
                    var item = <RadioButtons 
                        key={element.FieldID}
                        Placeholder={`input ${element.FieldName}`}
                        FieldName={element.FieldName}
                        Type={element.DataType}
                        OptionList={element.PossibleValues}
                        DefultValue={element.DefaultValue}
                        onchange= {setActivity}
                    />
                    output.push(item);
                    break;


                case FieldType.DropDownList:
                    var item = <DropDownList 
                        key={element.FieldID}
                        Placeholder={`input ${element.FieldName}`}
                        FieldName={element.FieldName}
                        Type={element.DataType}
                        OptionList={element.PossibleValues}
                        DefultValue={element.DefaultValue}
                        onchange= {setActivity}
                    />
                    output.push(item);
                    break;

                case FieldType.DatePicker:
                    var item = <DateInput 
                        key={element.FieldID}
                        Placeholder={`input ${element.FieldName}`}
                        FieldName={element.FieldName}
                        Type={element.DataType}
                        isrequired={element.IsRequired}  
                      
                        onchange= {setActivity}
                    />
                    output.push(item);
                    break;
                default:
                    console.log(element.FieldType)
            }
           
            


        });
        return output;
    }

    return(
        <Segment style={{padding:"50px"}} >
        <Header content="Activity Form"></Header>

         <Form onSubmit={values=> handleSubmit(values)} >
        <>
        { renderForm()}
        
        </>




{/*             
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
             isrequired={true}/> */}
           
            
            {
                activityMetaRegistry.size > 0?(
                <Button  style={{marginBottom:"20px"}}
                      
                      floated='right' 
                      positive 
                      type = "submit" 
                      content = "Submit" 
                      
                  />

                ):(
                    <Header as='h3' color="red" textAlign='center'> 
                     Activity form  is currently unavialable.
                    </Header>
                )
            }
            
        
        </Form>
        </Segment>
       
    )
})