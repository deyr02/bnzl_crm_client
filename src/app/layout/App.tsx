import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import ActivityDashBoard from '../../features/activiites/dashboard/ActivityDashBoard';
import ActivityForm from '../../features/activiites/form/ActivityForm';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-right" hideProgressBar />
      <NavBar/>
      <Container style ={{marginTop: '7em'}}>

       {/* <ActivityDashBoard/>  */}



       <ActivityForm/> 
      </Container>
      
      
    </div>
  );
}

export default App;
