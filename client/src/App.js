// import logo from './logo.svg';
import './App.css';
import Form from './components/code_editor/form';
import Page2 from './components/code_snippet/submissions';
import Navbar from './components/navbar';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App bg-gray-700 w-full min-h-[100vh]">
      <Navbar/>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
            <Route index element={<Form />} />
            <Route path="page2" element={<Page2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



