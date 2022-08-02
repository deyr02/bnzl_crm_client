import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

interface LoginFormData{
    query:string;
}

export default function Login(){
    const{userStore} = useStore();
    const{login} =userStore;
    const[userName, setUserName]= useState("");
    const[password, setPassword]= useState("");
    const[modelstate, setModelState] = useState<boolean>(false);

    async function   handleSubmit(vlaues:any){
        console.log(userName, password);
        setModelState(false);
        var formCollection:LoginFormData =
        {
            query:"mutation Login{ Login(input:{UserName: \""+ userName +"\", Password: \"" +password+"\"}){ UserName Token Expiry } }"
        }

        var result = await login(formCollection);
        if(result.data == null){
            setModelState(true);
        }
        console.log(result);
        return;
    }

    return(
        <div className={"loginBox"}>
            <Form onSubmit={values=> handleSubmit(values)} >
            <Message
                visible={modelstate}
                error
                header='Invalid User'
                content='Wrong username or password'
                />
                    <Form.Field>
                    <label>UserName</label>
                    <input required onChange={(event:any)=> setUserName(event.target.value)} placeholder='Input userName' />
                    </Form.Field>

                    <Form.Field >
                    <label  >Password</label>
                    <input required onChange={(event:any)=> setPassword(event.target.value)} type={"password"} placeholder='Input Password' />
                    </Form.Field>

                    <div style={{textAlign:"right"}}>
                    <Button  type='submit'>Submit</Button>
                    </div>
                </Form>
        </div>
    
    )
}