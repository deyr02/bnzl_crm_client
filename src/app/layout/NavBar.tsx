import React from "react";
import { Container, Menu } from "semantic-ui-react";

export default function NavBar(){

    return(
        <Menu inverted fixed='top'>
            <Container>
            <Menu.Item 
                name='home'>
                Home
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