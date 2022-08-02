import jsPDF from "jspdf";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Header } from "semantic-ui-react";
import Column from "../../../app/common/report/Column";
import { Activity } from "../../../app/models/Activity";
import { RowDetails } from "../../../app/models/RowDetails";
import { useStore } from "../../../app/stores/store";

interface Prop{
    activity:Activity;
}

export default observer( function ActivityReport(prop:Prop){
    let _data:RowDetails[] = [
        {
            fieldName: "ActivityName",
            DataType: "String",
            value: "test12345678",
            onlyKey:true,
            DragStart:drag
        },
        {
            fieldName: "ActiviyType",
            DataType: "String",
            value: "Phone Call",
            onlyKey:true,
            DragStart:drag
        },
        {
            fieldName: "Start",
            DataType: "Date",
            value: "Fri Jul 01 2022 00:00:00 GMT+1200 (New Zealand Standard Time)",
            onlyKey:true,
            DragStart:drag
        },
        {
            fieldName: "Finish",
            DataType: "Date",
            value: "Fri Jul 01 2022 00:00:00 GMT+1200 (New Zealand Standard Time)",
            onlyKey:true,
            DragStart:drag
        },
        {
            fieldName: "Status",
            DataType: "String",
            value: "Active",
            onlyKey:true,
            DragStart:drag
        },
        {
            fieldName: "Priority",
            DataType: "String",
            value: "Low",
            onlyKey:true,
            DragStart:drag
        },
        {
            fieldName: "Source",
            DataType: "String",
            value: "LinkedIN,",
            onlyKey:true,
            DragStart:drag
        }
    ]

    const{activityStore} = useStore();
    const{loadSelectedActivity, selectedActivityRecord} =activityStore;
    let _fildCollection:RowDetails[] =  getRowDetails(prop.activity);
    let _report:RowDetails[]= [];
    const[data, setData]= useState<[RowDetails[], RowDetails[]]>([_fildCollection, _report])

 

    function getRowDetails(activity:Activity){

        let _rows:RowDetails[] = [];
        if (activity){
            activity.Properties.forEach(ele =>{
                let row:RowDetails ={
                    fieldName: ele.key,
                    DataType: ele.DataType,
                    value:ele.value,
                    onlyKey: true,
                    DragStart:drag,
                }
                _rows.push(row);
            })
        }
       
        return _rows;
    }
 
    function renderReport(){
        let activity=  loadSelectedActivity().then(()=>{
            if(selectedActivityRecord!){
                _fildCollection = getRowDetails(selectedActivityRecord);

                console.log(_fildCollection);
                setData([_fildCollection, _report]);
            }
        })
        
    }

    // useEffect(()=>{
   
    //   if(data[0].length === 0 &&  data[1].length === 0) renderReport();
       
    //   console.log(_fildCollection.length);
    // },[renderReport])



    //  hold the value of dragged element id.
   let elementID:any = null;
    //this  element hold the value pole box element id, from where dragging is started.
   let targetedFrom:any = null;

   let targetedTo:any = null;


   var _temp:RowDetails|null = null;
  function drag(ev:any){
    elementID= ev.currentTarget.id;
    targetedFrom = ev.target.parentElement.id;


    if(targetedFrom==="fieldCollections"){
        data[0].forEach((ele, index) =>{
            if(ele.fieldName === elementID){
                _temp = ele;
                _temp.onlyKey= false;
                data[0].splice(index, 1);
                data[1].push(ele);
            }
        });
    }

   
 
    if(targetedFrom==="report"){
        data[1].forEach((ele, index) =>{
            if(ele.fieldName === elementID){
                _temp = ele;
                _temp.onlyKey= true;
                data[1].splice(index, 1);
                data[0].push(ele);
            }
        });
    }
   


    console.log(elementID.toString());
    console.log(targetedFrom);

    
    

}

function allowDrop(ev:any){
    ev.preventDefault();
      
 
}

function drop (ev:any){  
 targetedTo = ev.target.id;
  moveRow();
  //console.log(elementID,targetedFrom, targetedTo);
}


function moveRow(){

    if( true){
            let temp:RowDetails|null = null;
            let _tempFieldCollectionRow:RowDetails[] = data[0];
            let _tempReport:RowDetails[]= data[1];
           
        if( targetedTo === "report"){
         
            _tempFieldCollectionRow.forEach((ele, index) =>{
                if(ele.fieldName === elementID){
                    temp = ele;
                    temp.onlyKey= false;
                    _tempFieldCollectionRow.splice(index, 1);
                    _tempReport.push(ele);
                }
            })
          

            setData([_tempFieldCollectionRow, _tempReport]);
        }

        if( targetedTo=== "fieldCollections"){
            _tempReport.forEach((ele, index) =>{
                if(ele.fieldName === elementID){
                    temp = ele;
                    temp.onlyKey= true;
                    _tempReport.splice(index, 1);
                    _tempFieldCollectionRow.push(ele);
                }
            })
            setData([_tempFieldCollectionRow, _tempReport]);
        }

    }
}


function generatePdf (){
    var doc =  new jsPDF("p", "pt", "a3");
    const elment:HTMLElement|null = document.querySelector("#report");
    if(elment){
        doc.html(elment, {
                    callback: function(pdf){
                        pdf.save("ActivityReport"+ ".pdf");
                    }
                });
    }
   
}



    return(
        <Container>
            <Header textAlign="center" as="h1">Activity Report</Header>
            <Grid>
                <Column

                    width={4}
                    dataRows={data[0]}
                    columType="fieldCollections"
                    allowDrop= {allowDrop}
                    onDrop={drop}
                />
                <Column
                 width={12}
                 dataRows={data[1]}
                 columType="report"
                 allowDrop = {allowDrop}
                onDrop={drop}
                />
                <Grid.Column width={16} textAlign="right">
                <Button  style={{marginBottom:"20px"}}
                     onClick={()=> window.location.reload()}
                      color="youtube"
                      content = "Cancel" 
                      
                  />
                    <Button onClick={generatePdf} primary>Generate PDF Report</Button>
                   
                </Grid.Column>

            </Grid>
            

        </Container>
    )
})