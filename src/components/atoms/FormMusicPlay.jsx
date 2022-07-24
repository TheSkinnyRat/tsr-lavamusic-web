import { useParams } from 'react-router-dom';
import { useState } from 'react';
import api from '../../api';

function App({setAlert, setSongs}) {

  const { guildId } = useParams();

  const [queryInput, setQueryInput] = useState('');

  const search = async (e, query) => {
		setAlert({ type: 'primary', title: `Searching for: ${query}`, loading: true });
		e.preventDefault();
		try {
			const searchResponse = await api.musicSearch(query);
			if(searchResponse.success) {
        const track = searchResponse.success.data.search.tracks[0];
        if (!track) return setAlert({ type: 'danger', title: `No Result for: ${query}`, loading: false });
				setSongs([track]);
				setAlert({ type: 'primary', title: `Adding: ${track.title}`, loading: true });

        const playResponse = await api.guildTrackAdd(guildId, track.identifier);
        if(playResponse.success) {
          setAlert({ type: 'success', title: playResponse.success.data.message, loading: false });
        }
			}
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
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
        <button id="btnSearch" className="btn btn-primary btn-sm" type="submit">
          <i className="fa-solid fa-play"></i>
        </button>
      </div>
    </form>
  );
}

export default App;
