
import React from 'react'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './index.css'
import { RegisterCandidate } from './components/authentication/RegisterCandidate.jsx'
import Home from './components/home/Home.jsx'
import { LoginCandidate } from './components/authentication/LoginCandidate.jsx'
import About from './components/about/About.jsx'
import Contact from './components/about/Contact.jsx'
import Login from './components/authentication/Login.jsx'
import Register from './components/authentication/Register.jsx'
import { LoginClient } from './components/authentication/LoginClient.jsx'
import { RegisterClient } from './components/authentication/RegisterClient.jsx'
import AvailableRequirement from './components/candidate/requirement/AvailableRequirement.jsx'
import RequirementDetail from './components/candidate/requirement/RequirementDetail.jsx'
import CandidateProfile from './components/candidate/profile/CandidateProfile.jsx'
import EditCandidateProfile from './components/candidate/profile/EditCandidateProfile.jsx'
import AllApplication from './components/candidate/application/AllApplication.jsx'
import ApplicationDetail from './components/candidate/application/ApplicationDetail.jsx'
import InterviewCandidate from './components/candidate/interview/InterviewCandidate.jsx'
import JoinInterview from './components/candidate/interview/JoinInterview.jsx'
import ClientRequirement from './components/client/ClientRequirement.jsx'
import AddRequirement from './components/client/AddRequirement.jsx'
import ClientApplicants from './components/client/ClientApplicants.jsx'
import ClientInterviewUpcoming from './components/client/ClientInterviewUpcoming.jsx'
import ClientProfile from './components/client/ClientProfile.jsx'
import LoginAdmin from './components/authentication/LoginAdmin.jsx'
import ForgotPassword from './components/authentication/ForgotPassword.jsx'
import ResetPassword from './components/authentication/ResetPassword.jsx'
import CandidatesForAdmin from './components/admin/CandidatesForAdmin.jsx'
import CandidateDetails from './components/admin/CandidateDetails.jsx'
import RequirementsForAdmin from './components/admin/RequirementsForAdmin.jsx'
import RequirementDetailForAdmin from './components/admin/RequirementDetailForAdmin.jsx'
import AdminProfile from './components/admin/AdminProfile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'  element = {<App/>}>
      <Route path = ''  element = {<Home/>}/>
      <Route path='register/candidate' element = {<RegisterCandidate/>}/>
      <Route path='login/candidate' element = {<LoginCandidate/>}/>      
      <Route path='login/client' element = {<LoginClient/>}/>      
      <Route path='register/client' element = {<RegisterClient/>}/>      
      <Route path='about' element = {<About/>}/>     
      <Route path='contact' element = {<Contact/>}/>     
      <Route path='login' element = {<Login/>}/>      
      <Route path='register' element = {<Register/>}/>   
      <Route path='candidate/requirement' element = {<AvailableRequirement/>}/>   
      <Route path='candidate/requirement/detail/:requirementId' element = {<RequirementDetail/>}/>   
      <Route path='candidate/profile' element = {<CandidateProfile/>}/>
      <Route path='candidate/profile/edit' element = {<EditCandidateProfile/>}/>
      <Route path='candidate/application' element = {<AllApplication/>}/>
      <Route path='candidate/application/detail/:applicationId' element = {<ApplicationDetail/>}/>
      <Route path='candidate/interview/upcoming' element = {<JoinInterview/>}/>
      <Route path='interview/join' element = {<InterviewCandidate/>}/>
      <Route path='login/admin' element = {<LoginAdmin/>}/>
      <Route path='admin/candidate' element = {<CandidatesForAdmin/>}/>
      <Route path='admin/candidate/detail/:candidateId' element = {<CandidateDetails/>}/>
      <Route path='admin/requirement' element = {<RequirementsForAdmin/>}/>
      <Route path='admin/requirement/detail/:requirementId' element = {<RequirementDetailForAdmin/>}/>
      <Route path='admin/profile' element = {<AdminProfile/>}/>
      <Route path='client/requirement' element={<ClientRequirement/>}/>
      <Route path='client/add/requirement' element={<AddRequirement/>}/>
      <Route path='client/applicants' element={<ClientApplicants/>}/>
      <Route path='client/interview/upcomming' element={<ClientInterviewUpcoming/>}/>
      <Route path='client/profile' element={<ClientProfile/>}/>
      <Route path='/forgot-password' element = {<ForgotPassword/>}/>
      <Route path='/reset-password' element = {<ResetPassword/>}/>
    
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)