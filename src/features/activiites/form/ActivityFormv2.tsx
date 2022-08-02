import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import KeyValueInput from "../../../app/common/form/KeyValueInput";
import { DataType } from "../../../app/models/DataType";
import { useStore } from "../../../app/stores/store";

interface keyValueInputPair{
    FieldName:string;
    Value:string;
    isFirstField: boolean;
    isLastField:boolean;
    NewField: any;
    DeleteField:any;
    onchange:any;
}

interface activityFormData{
    query:string;
}

export default function ActivityFormV2(){

    let defultfield:keyValueInputPair = {
        FieldName: "ActivityName",
        Value: "",
        isFirstField: true,
        isLastField:true,
        NewField: ()=> AddNewField(),
        DeleteField:()=>{},
        onchange:()=>{},
    }
    const {activityStore} = useStore();
    const { createActivity} = activityStore;
    const [formRows, setFormRow]= useState<keyValueInputPair[]>([defultfield])

    
    
    function AddNewField(){
    
        let newfield:keyValueInputPair = {
            FieldName: "",
            Value: "",
            isFirstField: true,
            isLastField:true,
            NewField: ()=>AddNewField(),
            DeleteField:()=>{},
            onchange:()=>{},
        }

        formRows.push(newfield);
        setFormRow([...formRows]);
    }

    function DeleteField(index:number){
       
        if(index !== 0){
            console.log("clicked" + index);
             formRows.splice(index, 1);
            setFormRow([...formRows]);
        }
       
    }


    function setFieldValue(index:number, type:string, data:string){
        if(type==="key"){
            formRows[index].FieldName = data;
        }
        else if(type==="value"){
            formRows[index].Value = data;
        }

        setFormRow([...formRows]);
        
    }
    
    
    function renderForm(){
        let output:any = [];

        formRows.forEach((ele, index)=>{
            var _field = <KeyValueInput 
                key={index}
                FieldName={ele.FieldName}
                Value={ele.Value}
                isFirstField={index==0}
                isLastField={index === formRows.length-1}
                NewField ={()=>AddNewField()}
                DeleteField={()=>DeleteField(index)}
                onchange={(type:string, data:string)=>setFieldValue(index, type, data)}

            />

            output.push(_field)
        });

        return output;

    }


    function formantFieldValues(){
        let output = "[";
      

        formRows.forEach(ele =>{
            output += `{ key:\"${ele.FieldName}\" DataType:${DataType.String} value:\"${ele.Value}\" },`;
        })

        output+="]";
        return output

    }

    function handleSubmit( values:any){
        console.log(formRows);
        
        var mutation = "mutation AddActivity{AddNewActivity(input:{Properties:" + formantFieldValues() + " }){ActivityID CreatedAT UpdatedAT CreatedBy ModifiedBy DeletedAT Properties{ key DataType value } }}";

          var formCOllection:activityFormData ={query:mutation};
          console.log(formCOllection);
          createActivity(formCOllection).then(()=>{
            console.log("created");
          })
    }

    return(

        <Segment style={{padding:"50px"}} >
        <Header content="Activity Form (Version-2)"></Header>

         <Form onSubmit={values=> handleSubmit(values)} >
        <>
        { 
            renderForm()
        }

        
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
                1 > 0?(
                    <>
                   
                <Button  style={{marginBottom:"20px"}}
                      
                      floated='right' 
                      positive 
                      type = "submit" 
                      content = "Submit" 
                      
                  />

                <Button  style={{marginBottom:"20px"}}
                      as={NavLink}
                      to="/activity"
                      floated='right' 
                      color="youtube"
                      content = "Cancel" 
                      
                  />
                    </>
                ):(
                    <Header as='h3' color="green" textAlign='center'> 
                     Activity form  is loading.......
                    </Header>
                )
            }
            
        
        </Form>
        </Segment>
    )
}