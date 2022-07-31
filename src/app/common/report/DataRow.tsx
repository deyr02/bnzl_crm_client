import React from "react";


interface Prop{
    fieldName: string;
    DataType: string;
    value:string;
    onlyKey:boolean;
    DragStart: any;
    
}

export default function DataRow(prop:Prop){
    return(
        <div id={prop.fieldName}  draggable  onDragStart={prop.DragStart} className="data_row">
            <div id={prop.fieldName+"01"} className="data_key">{prop.fieldName}</div>
            {!prop.onlyKey?( <div className="data_value">{prop.value}</div>):(<></>)}
           
        </div>
        
    )
}

