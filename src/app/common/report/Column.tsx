import React from "react";
import { Grid, SemanticWIDTHS } from "semantic-ui-react";
import { RowDetails } from "../../models/RowDetails";
import DataRow from "./DataRow";


interface Prop{
    width: SemanticWIDTHS;
    dataRows: RowDetails[];
    columType: string;
    allowDrop: any;
    onDrop:any;
}

export default function Column(prop:Prop){

    function renderDataRows(){
        var output = new Array(prop.dataRows.length);

        prop.dataRows.forEach(ele=> {
            
            var item = <DataRow 
         
            key={ele.fieldName}
            fieldName={ele.fieldName}
            DataType= {ele.DataType}
            value= {ele.value}
            onlyKey= {ele.onlyKey}
            DragStart= {ele.DragStart}
            />

        output.push(item);

        })
        return output;
      console.log(output)

    }

    return(


        
        <Grid.Column  width={prop.width}>
            <div 
                id={prop.columType}  
                onDrop={(event)=>prop.onDrop(event)} 
                onDragOver={(event:any)=>prop.allowDrop(event)}   
                className={prop.columType}>{
               renderDataRows()
            }
            </div>
        </Grid.Column>
    )
}