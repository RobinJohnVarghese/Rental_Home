import {Fragment}  from 'react'
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Companies from '../components/Companies/Companies'
import Footer from '../components/Footer/Footer';
import './HomePage.css'


function HomePage() {
  return (
    <Fragment>
        <div className="App">
        <div>
        <div className="white-gradient" />
          <Header/>
          <Hero/>
          <Companies/> 
          <Footer/> 
        </div>
        </div>        
    </Fragment>
  )
}

export default HomePage;