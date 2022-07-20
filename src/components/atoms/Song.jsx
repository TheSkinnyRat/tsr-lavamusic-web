import { useParams } from 'react-router-dom';
import { convertTime } from '../../utils/convert';
import ImgMusic from './ImgMusic';
import api from '../../api';

function App({song, setAlert}) {

  const { guildId } = useParams();

  const addSong = async (identifier) => {
		setAlert({ type: 'warning', title: `Adding to queue: ${song.title}`, loading: true });
		try {
			const response = await api.guildTrackAdd(guildId, identifier);
			if(response.success) {
				setAlert({ type: 'success', title: response.success.data.message, loading: false });
			}
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
		}
	}

  if(!song){
    return <ImgMusic />;
  }
  
  return (
    <div>
      <div className="row align-items-center">
        <div className="col-12 col-md-2">
          <img src={song.thumbnail} alt="" className="rounded border" width="75" height="55" />
        </div>
        <div className="col-10 col-md-8">
          <div className="row">
            <div className="col-12">
              <div className="font-weight-bold">
                {song.title}
              </div>
            </div>
            <div className="col-12">
              <div className="text-muted">
                {song.author} ({convertTime(song.duration)})
              </div>
            </div>
          </div>
        </div>
        <div className="col-2 d-flex justify-content-center">
          <button className="btn btn-primary btn-sm" type="button" onClick={() => addSong(song.identifier)}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default App;
