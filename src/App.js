// import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


const App=()=>{
  // state={
  //   progress:0
  // }
  const [progress, setProgress] = useState(0)

  // setProgress=(progress)=>{
  //   setState({progress:progress})
  // }
    return (
      <>
      <BrowserRouter>
      <div>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}  
      />
        <Routes>
        <Route exact path="/" element={<News progress={setProgress} key="general" pageSize={15} country='in' category='general'/>}/>
        <Route exact path="/business" element={<News progress={setProgress} key="business" pageSize={15} country='in' category='business'/>}/>
        <Route exact path="/entertainment" element={<News progress={setProgress} key="entertainment" pageSize={15} country='in' category='entertainment'/>}/>
        <Route exact path="/general" element={<News progress={setProgress} key="general" pageSize={15} country='in' category='general'/>}/>
        <Route exact path="/health" element={<News progress={setProgress} key="health" pageSize={15} country='in' category='health'/>}/>
        <Route exact path="/science" element={<News progress={setProgress} key="science" pageSize={15} country='in' category='science'/>}/>
        <Route exact path="/sports" element={<News progress={setProgress} key="sports" pageSize={15} country='in' category='sports'/>}/> 
        <Route exact path="/technology" element={<News progress={setProgress} key="technology" pageSize={15} country='in' category='technology'/>}/>
        </Routes>
      </div>
      </BrowserRouter>
      </>
    )
}


export default App;
