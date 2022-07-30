import { ElementValue } from "./ElementValue";

export interface Activity {
    ActivityID: string;

    CreatedAT: string;
    UpdatedAT: string;
    DeletedAT: string;
  
    CreatedBy: string;
    ModifiedBy: string;
  
    Properties: ElementValue[];
}