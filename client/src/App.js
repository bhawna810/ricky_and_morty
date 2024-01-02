import React from 'react';
import { Route, Routes } from 'react-router-dom';
import  CharacterList from './component/CharacterList';
import  CharacterDetails from './component/CharacterDetails';
import './App.css';


function App() {
  return (
   
      <div className="App">
        <Routes>
          <Route path="/" exact element={<CharacterList/>} />
          <Route path="/character/:id" element={<CharacterDetails/>} />
        </Routes>
      </div>
 
  );
}

export default App;
