import React from 'react'
import Area from './components/Typing/Area'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import './App.css'

function App() {
  return (
    <>
      <div className="dabba">
        <div className="headerrr">
          <Header />
        </div>
        <div className="area">
          <Area />
        </div>
        <div className="footer">
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default App