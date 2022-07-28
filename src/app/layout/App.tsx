import React from 'react';
import { Container } from 'semantic-ui-react';
import ActivityForm from '../../features/activiites/form/ActivityForm';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Container style ={{marginTop: '7em'}}>
      <ActivityForm/>
      </Container>
      
      
    </div>
  );
}

export default App;
