import { useParams } from 'react-router-dom';
import Song from '../atoms/Song';
import api from '../../api';

function App({prop, setAlert, setSongs}) {

  const { guildId } = useParams();

	let title ='';
	if (prop.songs.type === 'search') {
		title = `Search Result`;
	} else if (prop.songs.type === 'play') {
		title = `Played Song`;
	} else if (prop.songs.type === 'recommended') {
		title = `Recommended Songs`;
	}
	const ButtonRecommended = () => {
		return (
			<button className='btn btn-sm btn-link text-decoration-none' onClick={e => getRecommendedSongs(e)}>
				<i className="fa-solid fa-compact-disc"></i> Show Recommended
			</button>
		);
	}
	const ButtonRecommendedRefresh = () => {
		return (
			<button className='btn btn-sm btn-link text-decoration-none' onClick={e => getRecommendedSongs(e)}>
				<i className="fa-solid fa-rotate-right"></i> Refresh
			</button>
		);
	}
	const TextRecommendedError = () => {
		return (
			<div>
				Recommended songs are based on the currently playing music.<br />
				So you need to play some music first.
			</div>
		);
	}

	const getRecommendedSongs = async (e) => {
		e.preventDefault();
		setAlert({ type: 'primary', title: `Getting recommended songs`, loading: true });
		try {
			const response = await api.guildTrackRecommended(guildId);
			if(response.success) {
        const tracks = response.success.data.search.tracks;
        if (!tracks[0]) return setAlert({ type: 'danger', title: `No recommended track found`, loading: false });
        setSongs({tracks: tracks, action: 'add', type: 'recommended'});
				setAlert({ type: 'success', title: `Successfully get recommended songs `, loading: false });
			}
		} catch (error) {
			if (error?.response?.status === 404) setSongs({tracks: [], error: 'recommended'});
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
		}
	}
  
  return (
    <div className="card">
			<div className="card-body">
				<div className="text-center">
					{prop.songs.error === 'recommended' ? <TextRecommendedError /> : null}
					{prop.songs.type !== 'recommended' ? <ButtonRecommended /> : <ButtonRecommendedRefresh />}
				</div>
				<span className='font-weight-bold'>{title}</span>
				{(prop.songs.tracks.length !== 0) ? 
					prop.songs.tracks.map(song => 
						<Song 
							key={prop.songs.action+song.identifier}
							song={song} setAlert={setAlert}
							action={prop.songs.action} />
					)
				:
					null}
			</div>
		</div>
  );
}

export default App;
