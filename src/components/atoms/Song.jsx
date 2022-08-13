import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { convertTime } from '../../utils/convert';
import ImgMusic from './ImgMusic';
import api from '../../api';
import Tippy from '@tippyjs/react';

function App({song, position, setAlert, setSongs, action}) {

  const { guildId } = useParams();

  const ButtonAdd = () => {
    return (
      <Tippy content="Add to queue" animation='shift-away' arrow={false}>
        <button className="btn btn-primary btn-sm rounded-circle" onClick={() => addSong(song.identifier)}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </Tippy>
    );
  }
  const ButtonRemove = () => {
    return (
      <Tippy content="Remove from queue" animation='shift-away' arrow={false}>
        <button className="btn btn-link btn-sm" onClick={() => removeSong(position)}>
          <i className="fa-solid fa-circle-minus"></i>
        </button>
      </Tippy>
    );
  }
  const ButtonLoading = () => {
    return (
      <button className="btn btn-link btn-sm text-primary disabled">
        <i className="fa-solid fa-circle-notch fa-spin fa-fade"></i>
      </button>
    );
  }
  const ButtonSuccess = () => {
    return (
      <button className="btn btn-link btn-sm text-success disabled">
        <i className="fa-solid fa-check"></i>
      </button>
    );
  }
  let initialButtonAction = '';
  if (action === 'add') {
    initialButtonAction = <ButtonAdd />;
  } else if (action === 'remove') {
    initialButtonAction = <ButtonRemove />;
  } else if (action === 'success') {
    initialButtonAction = <ButtonSuccess />;
  }
  const [buttonAction, setButtonAction] = useState(initialButtonAction);

  const addSong = async (identifier) => {
    setButtonAction(<ButtonLoading />);
		setAlert({ type: 'primary', title: `Adding to queue: ${song.title}`, loading: true });
		try {
			const response = await api.guildTrackAdd(guildId, identifier);
			if(response.success) {
				setAlert({ type: 'success', title: response.success.data.message, loading: false });
        setButtonAction(<ButtonSuccess />);
			}
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
      setButtonAction(<ButtonAdd />);
		}
	}

  const removeSong = async (position) => {
    setButtonAction(<ButtonLoading />);
    setAlert({ type: 'primary', title: `Removing from queue: ${song.title}`, loading: true });
		try {
      const response = await api.guildTrackDelete(guildId, position);
			if(response.success) {
				setAlert({ type: 'success', title: response.success.data.message, loading: false });
        setButtonAction(<ButtonSuccess />);
			}
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
      setButtonAction(<ButtonRemove />);
		}
	}

  const getRecommendedSongs = async (e, identifier) => {
		e.preventDefault();
    window.scrollTo({top: 0, left: 0, behavior: "smooth"})
		setAlert({ type: 'primary', title: `Getting recommended songs for identifier: ${identifier}`, loading: true });
		try {
			const response = await api.guildTrackRecommended(guildId, identifier);
			if(response.success) {
        const tracks = response.success.data.search.tracks;
        if (!tracks[0]) return setAlert({ type: 'danger', title: `No recommended track found`, loading: false });
        setSongs({tracks: tracks, action: 'add', type: 'recommended'});
				setAlert({ type: 'success', title: `Successfully get recommended songs for identifier: ${identifier}`, loading: false });
			}
		} catch (error) {
			if (error?.response?.status === 404) setSongs({tracks: [], error: 'recommended'});
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
		}
	}

  if(!song){
    return <ImgMusic />;
  }
  
  return (
    <div>
      <div className="row mt-3">
        <div className="col-4 col-sm-2 my-auto p-0 m-0">
          <img src={song.thumbnail} alt="" className="rounded border img-fluid mx-auto d-block w-75 h-75"/>
        </div>
        <div className="col-9 col-sm-8 my-auto">
          <div className='mt-2 mt-sm-0 font-weight-bold d-block text-truncate'>{song.title}</div>
          <div className='text-muted text-truncate small'>{song.author} ({convertTime(song.duration)})</div>
          <Tippy content={<div className='text-center'>Get recommended based on this track</div>} animation='shift-away' arrow={false} maxWidth={150}>
            <button className="btn btn-link btn-sm p-0 m-0 border-0 mr-1" onClick={(e) => getRecommendedSongs(e, song.identifier)} >
              <i className="fa-solid fa-bars-staggered"></i>
            </button>
          </Tippy>
          <Tippy content="Open youtube" animation='shift-away' arrow={false}>
            <a className="btn btn-link btn-sm p-0 m-0 border-0 mr-1" href={song.uri} target='blank'>
              <i className="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </Tippy>
        </div>
        <div className="col-3 col-sm-2 text-right my-auto">
          {buttonAction}
        </div>
      </div>
      <hr className='d-sm-none' />
    </div>
  );
}

export default App;
