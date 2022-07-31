import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import ActivityDashBoard from '../../features/activiites/dashboard/ActivityDashBoard';
import ActivityForm from '../../features/activiites/form/ActivityForm';
import ActivityReport from '../../features/activiites/report/ActivityReport';
import Home from '../../features/home/Home';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <Home/>
      <ToastContainer position="bottom-right" hideProgressBar />
      {/* <NavBar/>
      <Container style ={{marginTop: '7em'}}> */}

       {/* <ActivityDashBoard/>  
       <ActivityForm/>  */}

       {/* <ActivityReport/> */}
       
      {/* </Container> */}
      
      
    </div>
  );
}

export default App;
