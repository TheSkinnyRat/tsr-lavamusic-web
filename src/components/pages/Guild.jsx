import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';


function App() {

  useEffect(() => {
    document.title = `TSR Music Bot`;
  });
  
  return (
    <div id='wrapper' className='bg-secondary'>
      <div style={{minHeight: '90vh'}} />
      <div id="content-wrapper" className="d-flex flex-column bg-secondary overflow-hidden">
        <div id="content" className='mt-2 mb-4'>
          <Navbar />
          <Outlet />
        </div>
        <Footer />
      </div>

      <a className="scroll-to-top rounded" href="#wrapper" style={{display: 'none'}} >
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  );
}

export default App;
