import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";

export default function NavBar(){

    return(
        <Menu inverted fixed='top'>
            <Container>
            <Menu.Item onClick={()=>window.location.reload()}  as={NavLink} to="/activity"
                name='activity'>
                Activity
            </Menu.Item>

            {/* <Menu.Item
                name='reviews'>
                Reviews
            </Menu.Item>

            <Menu.Item
                name='upcomingEvents'>
                Upcoming Events
            </Menu.Item> */}
            </Container>
            
        </Menu>
    )
}