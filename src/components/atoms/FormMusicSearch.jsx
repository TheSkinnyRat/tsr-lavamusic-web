import { useState } from 'react';
import api from '../../api';

function App({setAlert, setSongs}) {

  const [queryInput, setQueryInput] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const search = async (e, query) => {
    setButtonDisabled(true);
		setAlert({ type: 'primary', title: `Searching for: ${query}`, loading: true });
		e.preventDefault();
		try {
			const response = await api.musicSearch(query);
			if(response.success) {
        const tracks = response.success.data.search.tracks;
        if (!tracks[0]) return setAlert({ type: 'danger', title: `No Result for: ${query}`, loading: false });
        setSongs({tracks: tracks.slice(0, 10), action: 'add', type: 'search'});
				setAlert({ type: 'success', title: `Result for: ${query}`, loading: false });
        setButtonDisabled(false);
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
        placeholder="Search song ..."
        onInput={(e) => setQueryInput(e.target.value)}
        required={true} />
      <div className="input-group-append">
        <button id="btnSearch" className="btn btn-primary btn-sm" type="submit" disabled={buttonDisabled}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </form>
  );
}

export default App;
