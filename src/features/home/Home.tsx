import React from "react";
import { Container, Header, Image, Segment } from "semantic-ui-react";
import logo from "../../app/common/images/logo.png"
import Login from "../users/Login";

export default function Home(){
    return(
        <Segment  textAlign='center' vertical className='masthead' >
            <Container text>
            <div>
                <Login/>
            </div>
             <div className="logo" >
                <Image  src={logo} alt='logo' style= {{marginBottom:12, height:"150px", width:"250px"}}/>
            </div>

            </Container>

           
        </Segment>
    )
}