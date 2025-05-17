import logo from './logo.svg';
import './App.css';
import AdminCreate from './Components/AdminCreate';
import EventPage from './Components/EventPage';
import EventManage from './Components/EventManage';
import Approval from './Components/Approval';
import EditEvent from './Components/EditEvent';
import EventManageB from './Components/EventManageB';
import ErrorPage from './Components/ErrorPage';
import OktoLogin from './Components/OktoLogin';
import Home from './Components/Home';
import Home2 from './Components/Home2';
import MapComponent from './Components/MapComponent';
import QR from './Components/QR';
import Dashboard from './Components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import Testing from './Components/Testing'
import Testing2 from './Components/Testing2'
import Overview from './Components/Overview'
import Meet from './Components/Meet'
import OnlineDashboard from './Components/OnlineDashboard'
import ProfileSettings from './Components/ProfileSettings';
import Chat from './Components/Chat'
import TestRealTime from './Components/TestRealTime'
import Community from './Components/Community'
import GroupInfo from './Components/GroupInfo'
import Testing4 from './Components/Testing4';
import Channel from './Components/Channel'
import Pricing from './Components/Pricing'
function App() {
  const OKTO_CLIENT_API_KEY = "f144c56d-f768-426c-b123-f7ee71f8cee8";
  return (
    <div className="App">
 

    <Router>
    <Routes>
    
      <Route path="/creator" element={ <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}><AdminCreate/></OktoProvider>} />
      <Route path="/event/:event_id" element={<OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}><EventPage /></OktoProvider>} />
      
      <Route path="/manage/:event_id" element={ <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}><Overview/></OktoProvider>} />
      <Route path="/approve/:event_id" element={ <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}><Approval/></OktoProvider>} />
      <Route path="/editevent/:event_id" element={<EditEvent />} />
      <Route path="/manageevent/:event_id" element={<EventManageB />} />
      <Route path="/error/:error_message" element={<ErrorPage />} />
      <Route path="/oktologin" element={ <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
         <OktoLogin/>
    </OktoProvider>} />
    <Route path="/Home" element={
        
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
         <Home />
    </OktoProvider>} />
    <Route path="/Home2" element={
        
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
         <Home2 />
    </OktoProvider>} />
    <Route path="/dashboard" element={
        
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <Dashboard/>
    </OktoProvider>} />

    <Route path="/onlinedashboard" element={
        
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <OnlineDashboard/>
    </OktoProvider>} />
     
    <Route path="/map/:event_id" element={<OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
       <MapComponent/>
    </OktoProvider>} />

   
    <Route path="/qr/:event_id" element={   <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
       <QR/>
    </OktoProvider>} />
    <Route path="/testing" element={ <Testing/>} />
    <Route path="/testing2" element={ <Testing2/>} />
    <Route path="/testing3/:community_id" element={  <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
       <TestRealTime/>
    </OktoProvider>} />
    <Route path="/meet" element={ <Meet/>} />

    <Route path="/profilesettings" element={
        
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <ProfileSettings/>
    </OktoProvider>} />

    <Route path="/chat" element={
        
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <Chat/>
    </OktoProvider>} />

    <Route path="/community" element={
        
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <Community/>
    </OktoProvider>} />

    <Route path="/groupinfo/:community_id" element={
        
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
       <GroupInfo/>
    </OktoProvider>} />


    <Route path="/testing4" element={
        
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
       <Testing4/>
    </OktoProvider>} />
      

    <Route path="/channel/:userName" element={
        
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <Channel/>
    </OktoProvider>} />

    <Route path="/pricing" element={
        
        <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
        <Pricing/>
    </OktoProvider>} />
   
    </Routes>
  </Router>
    </div>
  );
}

export default App;

