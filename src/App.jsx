import './App.css'
import { Route, Routes } from 'react-router-dom';
import Product from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes basename="/01">
        <Route path="/:gtin" element={ <Product/> }/>
      </Routes>
    </div>
  );
}

export default App
