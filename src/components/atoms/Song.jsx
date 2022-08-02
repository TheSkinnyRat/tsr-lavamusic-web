import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { convertTime } from '../../utils/convert';
import ImgMusic from './ImgMusic';
import api from '../../api';

function App({song, position, action, setAlert}) {

  const { guildId } = useParams();

  const ButtonAdd = () => {
    return (
      <button className="btn btn-primary btn-sm" onClick={() => addSong(song.identifier)}>
        <i className="fa-solid fa-plus"></i>
      </button>
    );
  }
  const ButtonRemove = () => {
    return (
      <button className="btn btn-link btn-sm" onClick={() => removeSong(position)}>
        <i className="fa-solid fa-circle-minus"></i>
      </button>
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

  if(!song){
    return <ImgMusic />;
  }
  
  return (
    <div>
      <div className="row mt-3">
        <div className="col-4 col-sm-2 my-auto p-0 m-0">
          <img src={song.thumbnail} alt="" className="rounded border img-fluid mx-auto d-block w-75 h-75"/>
        </div>
        <div className="col-9 col-sm-8">
          <div className='mt-2 font-weight-bold d-block text-truncate'>{song.title}</div>
          <small className='text-muted'>{song.author} ({convertTime(song.duration)})</small>
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
