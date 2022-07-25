import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';


function App() {

  useEffect(() => {
    document.title = `TSR Music Bot`;
  });
  
  return (
    <div id='wrapper' className='bg-light'>
      <div style={{minHeight: '90vh'}} />
      <div id="content-wrapper" className="d-flex flex-column overflow-hidden">
        <div id="content" className='mt-2 mb-4'>
          <Navbar />
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
