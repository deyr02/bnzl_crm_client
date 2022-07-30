import { DataType } from "./DataType";
import { FieldType } from "./FieldType";

export interface CustomFieldElement{
 FieldID: string;
 FieldName: string;
DataType: DataType;
  FieldType: FieldType;
  IsRequired: boolean;
  Visibility: boolean;
  SystemFieled: boolean;
  MaxValue: number;
  MinValue: number;
  DefaultValue: string;
  PossibleValues: string[];
  FieldOrder:number;
}