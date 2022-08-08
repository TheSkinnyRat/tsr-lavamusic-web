import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../../api/socket';
// import api from '../../api';
import Song from '../atoms/Song';

function App({setAlert, setSongs}) {
	const queueUpdateSocket = socket.queue;
  const { guildId } = useParams();

	const TextEmpty = () => {
		return (
			<div className='text-center'>-- Empty --</div>
		);
	}

	const initialSongs = {
		tracks: [],
		action: '',
	};
	const [songs, setQueueSongs] = useState(initialSongs);

	useEffect(() => {
    queueUpdateSocket.on('player:queueUpdate:success', (tracks) => {
			setQueueSongs({tracks: tracks.queue, action: 'remove'});
    });

    queueUpdateSocket.on('player:queueUpdate:error', (error) => {
			setAlert({ type: 'danger', title: `[Websocket] queueUpdate Error: ${error}`, loading: false });
    });

		queueUpdateSocket.emit('player:queueUpdate', guildId);

    return () => {
      queueUpdateSocket.off('player:queueUpdate:success');
      queueUpdateSocket.off('player:queueUpdate:error');
    };
  }, [guildId, queueUpdateSocket, setAlert]);
  
  return (
    <div className="card mt-2">
			<div className="card-body">
				<p className='font-weight-bold text-center'>Queue</p>
				{(songs.tracks.length !== 0) ? 
					songs.tracks.map((song, index) => 
						<Song 
							key={songs.action+song.identifier+index}
							song={song}
							position={index}
							setAlert={setAlert}
							setSongs={setSongs}
							action={songs.action} />
					)
				:
					<TextEmpty />}
			</div>
		</div>
  );
}

export default App;
