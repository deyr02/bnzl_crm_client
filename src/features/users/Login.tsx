import React from "react";
import { Button, Form } from "semantic-ui-react";


export default function Login(){
    return(
        <div className={"loginBox"}>
            <Form >
                    <Form.Field>
                    <label>UserName</label>
                    <input placeholder='First Name' />
                    </Form.Field>

                    <Form.Field >
                    <label  >Password</label>
                    <input type={"password"} placeholder='Last Name' />
                    </Form.Field>

                    <div style={{textAlign:"right"}}>
                    <Button  type='submit'>Submit</Button>
                    </div>
                </Form>
        </div>
    
    )
}