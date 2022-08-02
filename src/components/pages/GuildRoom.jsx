import { useEffect, useState } from 'react';
import '../../styles/App.css';
import Alert from '../atoms/Alert';
import CardMusic from '../organisms/CardMusic';
import CardFormMusic from '../organisms/CardFormMusic';
import CardMusicNowPlaying from '../organisms/CardMusicNowPlaying';
import CardMusicQueue from '../organisms/CardMusicQueue';

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
    type: '',
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
            <CardMusicNowPlaying setAlert={setAlert} />
            <CardMusicQueue
              prop={{
                songs: songs,
              }}
              setAlert={setAlert}
              setSongs={setSongs} />
          </div>
          <div className='col-12 col-md-8 order-1 order-md-2'>
            <CardFormMusic setAlert={setAlert} setSongs={setSongs} />
            <CardMusic
              prop={{
                songs: songs,
              }}
              setAlert={setAlert}
              setSongs={setSongs} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
