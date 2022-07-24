import { useState } from 'react';
import Alert from '../atoms/Alert';
import ImgMusic from '../atoms/ImgMusic';
import Song from '../atoms/Song';
import FormMusicSearch from '../atoms/FormMusicSearch';

function App() {

	const initialAlert = {
		type: 'secondary',
		title: 'Songs you\'ve searched will be displayed below.',
		loading: false
	};
	const [alert, setAlert] = useState(initialAlert);
	const [songs, setSongs] = useState([]);
  
  return (
    <section id="secCardMusic" className="row my-3 my-md-0 h-100">
			<div className="container my-auto">
				<div className="row align-items-center justify-content-center">
					<div className="col-12 col-md-10 col-lg-7">
						<div className="card">
							<div className="card-header p-2">
								<FormMusicSearch setAlert={setAlert} setSongs={setSongs} />
							</div>
							<div className="card-body">
								<Alert alert={alert}/>
									<div className="card">
									<div className="card-body">
										{(songs.length !== 0) ? songs.map(song => <Song key={song.identifier} song={song} setAlert={setAlert} />) : <ImgMusic />}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
  );
}

export default App;
