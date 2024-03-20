// import logo from './logo.svg';
import './App.css';
import Page1 from './components/page1/page1';
import Page2 from './components/page2/page2';
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <div className="App bg-gray-700 w-full min-h-[100vh]">
      <ToastContainer />
      <Page1/>
      {/* <Page2/> */}
    </div>
  );
}

export default App;
