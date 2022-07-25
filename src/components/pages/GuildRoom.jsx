import { useEffect, useState } from 'react';
import '../../styles/App.css';
import Alert from '../atoms/Alert';
import ImgMusic from '../atoms/ImgMusic';
import Song from '../atoms/Song';
import CardFormMusic from '../organisms/CardFormMusic';
import CardMusicNowPlaying from '../organisms/CardMusicNowPlaying';

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
  const initialSongs = {
		tracks: [],
		action: '',
	};
  const [songs, setSongs] = useState(initialSongs);
  
  return (
    <section id='secGuildRoom' className='row'>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Alert alert={alert} />
          </div>
          <div className='col-12 col-md-4 order-2 order-md-1 mt-2 mt-md-0'>
            <CardMusicNowPlaying />
          </div>
          <div className='col-12 col-md-8 order-1 order-md-2'>
            <CardFormMusic setAlert={setAlert} setSongs={setSongs} />
            <div className="card">
              <div className="card-body">
                <span className='font-weight-bold'>Search Result</span>
                {(songs.tracks.length !== 0) ? 
                  songs.tracks.map(song => 
                    <Song 
                      key={songs.action+song.identifier}
                      song={song} setAlert={setAlert}
                      action={songs.action} />
                  )
                :
                  <ImgMusic />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
