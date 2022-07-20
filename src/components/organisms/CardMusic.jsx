import { useState } from 'react';
import Alert from '../atoms/Alert';
import ImgMusic from '../atoms/ImgMusic';
import Song from '../atoms/Song';
import api from '../../api';

function App() {

	const initialAlert = {
		type: 'secondary',
		title: 'Songs you\'ve searched will be displayed below.',
		loading: false
	};
	const [alert, setAlert] = useState(initialAlert);

	const [songs, setSongs] = useState([]);
	const [queryInput, setQueryInput] = useState('');

	const search = async (e, query) => {
		setAlert({ type: 'warning', title: `Searching for: ${query}`, loading: true });
		e.preventDefault();
		try {
			const response = await api.musicSearch(query);
			if(response.success) {
				setAlert({ type: 'success', title: `Result for: ${query}`, loading: false });
				setSongs(response.success.data.search.tracks.slice(0, 5));
			}
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
		}
	}
  
  return (
    <section id="secRoom" className="row h-75 my-3 my-md-0 h-100">
			<div className="container my-auto">
				<div className="row align-items-center justify-content-center">
					<div className="col-12 col-md-10 col-lg-7">
						<div className="card">
							<div className="card-header p-2">
								<form className="input-group" onSubmit={(e) => search(e, queryInput)}>
									<input
										type="text"
										value={queryInput}
										className="form-control form-control-sm"
										placeholder="Search song ..."
										onInput={(e) => setQueryInput(e.target.value)}
										required={true} />
									<div className="input-group-append">
										<button id="btnSearch" className="btn btn-primary btn-sm" type="submit">
											<i className="fa-solid fa-magnifying-glass"></i>
										</button>
									</div>
								</form>
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
