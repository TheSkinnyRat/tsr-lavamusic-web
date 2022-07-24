import { useEffect, useState } from 'react';
import '../../styles/App.css';
import Alert from '../atoms/Alert';
import ImgMusic from '../atoms/ImgMusic';
import Song from '../atoms/Song';
import CardMenuMusic from '../organisms/CardMenuMusic';
import CardMusicNowPlaying from '../organisms/CardMusicNowPlaying';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';


function App() {

  useEffect(() => {
    document.title = `TSR Music Bot`;
  });

  const initialAlert = {
		type: 'secondary',
		title: 'Sunyi dan sepi, di ruang hampa~',
		loading: false
	};
	const [alert, setAlert] = useState(initialAlert);
  const [songs, setSongs] = useState([]);
  
  return (
    <div id='wrapper' className='bg-light'>
      <div style={{minHeight: '90vh'}} />
      <div id="content-wrapper" className="d-flex flex-column overflow-hidden">
        <div id="content" className='mt-2 mb-4'>
          <Navbar />
          <section id='secRoom' className='row'>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Alert alert={alert} />
                </div>
                <div className='col-12 col-md-4 order-2 order-md-1 mt-2 mt-md-0'>
                  <CardMusicNowPlaying />
                </div>
                <div className='col-12 col-md-8 order-1 order-md-2'>
                  <CardMenuMusic setAlert={setAlert} setSongs={setSongs} />
                  <div className="card">
                    <div className="card-body">
                      <span className='font-weight-bold'>Search Result</span>
                      {(songs.length !== 0) ? songs.map(song => <Song key={song.identifier} song={song} setAlert={setAlert} />) : <ImgMusic />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
