import { useParams } from 'react-router-dom';
import { useState } from 'react';
import api from '../../api';

function App({setAlert, setSongs}) {

  const { guildId } = useParams();

  const [queryInput, setQueryInput] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const search = async (e, query) => {
    setButtonDisabled(true);
		setAlert({ type: 'primary', title: `Searching for: ${query}`, loading: true });
		e.preventDefault();
		try {
			const searchResponse = await api.musicSearch(query);
			if(searchResponse.success) {
        const track = searchResponse.success.data.search.tracks[0];
        if (!track) {
          setAlert({ type: 'danger', title: `No track found: ${query}`, loading: false });
          setButtonDisabled(false);
          return;
        }
				setSongs({tracks: [track], action: 'success', type: 'play'});
				setAlert({ type: 'primary', title: `Adding: ${track.title}`, loading: true });

        const playResponse = await api.guildTrackAdd(guildId, track.identifier);
        if(playResponse.success) {
          setAlert({ type: 'success', title: playResponse.success.data.message, loading: false });
        }
			}
      setButtonDisabled(false);
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
      setButtonDisabled(false);
		}
	}
  
  return (
    <form className="input-group" onSubmit={(e) => search(e, queryInput)}>
      <input
        type="text"
        value={queryInput}
        className="form-control form-control-sm"
        placeholder="Play song ..."
        onInput={(e) => setQueryInput(e.target.value)}
        required={true} />
      <div className="input-group-append">
        <button id="btnSearch" className="btn btn-primary btn-sm" type="submit" disabled={buttonDisabled}>
          <i className="fa-solid fa-play"></i>
        </button>
      </div>
    </form>
  );
}

export default App;
