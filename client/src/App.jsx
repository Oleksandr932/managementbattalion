import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Positions from './pages/Positions'
import Faq from './pages/Faq'
import Footer from './components/Footer'
import ForFamilies from './pages/ForFamilies'
import Volunteers from './pages/Volunteers'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ProcessingData from './pages/ProcessingData'
import PositionCard from './pages/PositionCard'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddJob from './pages/owner/AddJob'
import AddNeeds from './pages/owner/AddNeeds'
import AddReports from './pages/owner/AddReports'
import Login from './components/Login'
import DelJob from './pages/owner/DelJob'
import DelNeeds from './pages/owner/DelNeeds'
import DelRepord from './pages/owner/DelRepord'
import FormApp from './components/helpers/Form'
import { useSelector } from 'react-redux'
import UpdateJob from './pages/owner/UpdateJob'

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("/owner")
  const [isFormToShow, setIsFormToShow] = useState(false);
  const formVisible = useSelector(state => state.form.formName)

  useEffect(() => {

    setIsFormToShow(formVisible);
  }, [formVisible]);

  return (
    <>
      <Toaster />

      {!isOwnerPath && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forFamilies" element={<ForFamilies />} />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/positions" element={<Positions />} />
        <Route path='/position/:id' element={<PositionCard />} />
        <Route path="/faq" element={<Faq />} />
        
        <Route path='/owner' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='addJob' element={<AddJob />} />
          <Route path='updateJob/:id' element={<UpdateJob />} />
          <Route path='delJob' element={<DelJob />} />
          <Route path='addNeeds' element={<AddNeeds />} />
          <Route path='delNeeds' element={<DelNeeds />} />
          <Route path='addReports' element={<AddReports />} />
          <Route path='delReports' element={<DelRepord />} />
        </Route>
        
        <Route path="/processingData" element={<ProcessingData />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />

        <Route path='/login-recruiterombr' element={<Login />} />
      </Routes>
      <div className="pt-24 bg-sand-500/20"></div>
      <Footer />

      {isFormToShow && <FormApp />}
    </>
  )
}

export default App
