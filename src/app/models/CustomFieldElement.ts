import { DataType } from "./DataType";
import { FieldType } from "./FieldType";

export interface CustomFieldElement{
 FieldID: string;
 FieldName: string;
DataType: DataType;
  FieldType: FieldType;
  IsRequired: Boolean;
  Visibility: Boolean;
  SystemFieled: Boolean;
  MaxValue: number;
  MinValue: number;
  DefaultValue: string;
  PossibleValues: string[];
  FieldOrder:number;
}