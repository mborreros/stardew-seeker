import TestPage from './test';
import Home from './home';
import Navigation from './navigation';

import { Routes, Route } from "react-router-dom";

// bootstrap style sheet
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  // testing for react compatibility
  // require('react-dom');
  // window.React2 = require('react');
  // console.log(window.React1 === window.React2);

  return (
    <div>
      <Navigation/>
      <Routes>
        <Route exact path="/" element={ <Home /> } />
        <Route path="/test" element={ <TestPage /> } />
        <Route path="/all-goals" element={ <TestPage /> } />
        <Route path="/my-goals" element={ <TestPage /> } />
        <Route path="/my-account" element={ <TestPage /> } />
      </Routes>
    </div>
  );
}

export default App;
