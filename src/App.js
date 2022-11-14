import Home from "./components/Home/Home";

import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
      <div className="box">
        <Routes>
          <Route exact path ="/" element = {<Home/>}/>        
        </Routes>
        
      </div>
      </div>
    </Router>
    
  );
}

export default App;
