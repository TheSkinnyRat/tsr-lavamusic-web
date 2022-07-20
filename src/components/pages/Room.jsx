import { useEffect } from 'react';
import '../../styles/App.css';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import CardMusic from '../organisms/CardMusic';

function App() {

  useEffect(() => {
    document.title = `TSR Music Bot`;
  });
  
  return (
    <div id='wrapper'>
      <div style={{minHeight: '90vh'}} />
      <div id="content-wrapper" className="d-flex flex-column bg-white overflow-hidden">
        <div id="content" className='mt-2 mb-4'>
          <Navbar />
          <CardMusic />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
