import { useEffect } from 'react';
import '../../styles/App.css';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import PageHome from '../organisms/PageHome';

function App() {

  useEffect(() => {
    document.title = `TSR Music Bot`;
  });
  
  return (
    <div id='wrapper'>
      <div style={{minHeight: '90vh'}} />
      <div id="content-wrapper" className="d-flex flex-column bg-white overflow-hidden">
        <div id="content">
          <Navbar />
          <PageHome />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
