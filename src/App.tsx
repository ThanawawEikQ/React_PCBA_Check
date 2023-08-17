
import './App.css';
import Nav from './Prop/Nav';
import Datagrid from './Component/Datagrid';
import LotCode from './Component/LotCode';
import { Link, Route,Routes } from 'react-router-dom';
function App() {
  return (
    <>
    <Nav/>
      <div className="App">
          <div className="Headers">
            <Routes >
              <Route path="/Detailpcb" element={<Datagrid/>}/>
              <Route path="/LotCode" element={<LotCode/>}/>
            </Routes>
          </div>
      </div> 
     </>
  );
}

export default App;
