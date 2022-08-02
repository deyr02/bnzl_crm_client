import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import ActivityDashBoard from '../../features/activiites/dashboard/ActivityDashBoard';
import ActivityForm from '../../features/activiites/form/ActivityForm';
import ActivityFormv2 from '../../features/activiites/form/ActivityFormv2';
import ActivityReport from '../../features/activiites/report/ActivityReport';
import Home from '../../features/home/Home';
import { useStore } from '../stores/store';
import NavBar from './NavBar';

function App() {
  const {commonStore, userStore} = useStore();

  return (
    <div className="App">
      <Routes>
      {/* <NavBar/> */}
      <Route  path='/' element={<Home/>} />

      <Route path="/activity" element={ 
        <>
         <NavBar/>
         <Container style ={{marginTop: '7em'}}> 
            <ActivityDashBoard/>
         </Container>
      
        </>
      }/>

      <Route path="/activity/create" element={
        <>
          <NavBar/>
          <Container style ={{marginTop: '7em'}}>
             <ActivityForm/>
          </Container>
        
        </>
      }/>


<Route path="/activity/createv2" element={
        <>
          <NavBar/>
          <Container style ={{marginTop: '7em'}}>
             <ActivityFormv2/>
          </Container>
        
        </>
      }/>

      
  {/* <Route path="/activity/report" element={
        <>
          <NavBar/>
          <Container style ={{marginTop: '7em'}}>
             <ActivityReport/>
          </Container>
        
        </>
      }/> */}

      </Routes>
   
      
      {/* <ToastContainer position="bottom-right" hideProgressBar />
      <NavBar/>
      <Container style ={{marginTop: '7em'}}>

       <ActivityDashBoard/>  
       <ActivityForm/> 

       <ActivityReport/>
       
      </Container> */}
      
      
    </div>
  );
}

export default App;
