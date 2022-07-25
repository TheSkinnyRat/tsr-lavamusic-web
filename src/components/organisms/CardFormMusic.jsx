import FormMusicSearch from '../atoms/FormMusicSearch';
import FormMusicPlay from '../atoms/FormMusicPlay';

function App({setAlert, setSongs}) {
  
  return (
    <div className="card text-center mb-2 mb-md-3 shadow-sm">
			<div className="card-header">
				<ul className="nav nav-pills card-header-pills">
					<li className="nav-item">
						<button className="btn btn-sm nav-link py-1 active" data-toggle="pill" data-target="#pills-play">Play</button>
					</li>
					<li className="nav-item">
						<button className="btn btn-sm nav-link py-1" data-toggle="pill" data-target="#pills-search">Search</button>
					</li>
				</ul>
			</div>
			<div className="card-body tab-content">
				<div className="tab-pane fade show active" id="pills-play">
					<FormMusicPlay setAlert={setAlert} setSongs={setSongs} />
				</div>
				<div className="tab-pane fade" id="pills-search">
					<FormMusicSearch setAlert={setAlert} setSongs={setSongs} />
				</div>
			</div>
		</div>
  );
}

export default App;
