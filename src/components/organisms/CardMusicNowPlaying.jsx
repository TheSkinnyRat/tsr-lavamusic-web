import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../../api/socket';
import imgIllustration from '../../images/undraw/happy-music.svg';

function App({setAlert}) {
	const playerUpdateSocket = socket.player;
  const { guildId } = useParams();

	const ButtonPlayPause = ({paused, disabled}) => {
		if (paused) {
			return (
				<button className='btn btn-outline-secondary mr-1' disabled={disabled} ><i className="fa-solid fa-pause"></i></button>
			);
		}
		return (
			<button className='btn btn-outline-primary mr-1' disabled={disabled} ><i className="fa-solid fa-play"></i></button>
		);
	}
	
	const [buttonPlayPause, setButtonPlayPause] = useState(<ButtonPlayPause disabled={true} />);
	const initialPlayer = {
		paused: false,
		repeat: false,
		track: {},
	}
	const [player, setPlayer] = useState(initialPlayer);

	useEffect(() => {
    playerUpdateSocket.on('player:playerUpdate:success', (player) => {
			setAlert({ type: 'success', title: `[Websocket] Incoming data: playerUpdate`, loading: false });
			setPlayer(player);
			// if (player?.track?.length) {
			// 	setButtonPlayPause(<ButtonPlayPause paused={player.paused} disabled={false} />);
			// }
    });

    playerUpdateSocket.on('player:playerUpdate:error', (error) => {
			setAlert({ type: 'danger', title: `[Websocket] playerUpdate Error: ${error}`, loading: false });
			setButtonPlayPause(<ButtonPlayPause disabled={true} />);
    });

		playerUpdateSocket.emit('player:playerUpdate', guildId);

    return () => {
      playerUpdateSocket.off('player:playerUpdate:success');
      playerUpdateSocket.off('player:playerUpdate:error');
    };
  }, [setAlert, playerUpdateSocket, guildId]);
  
  return (
    <div className="card">
			<div className="card-body text-center">
				<p className='font-weight-bold'>Now Playing「 Beta 」</p>
				<img
					src={
						player?.track?.identifier ?
							`https://img.youtube.com/vi/${player.track.identifier}/0.jpg`
						: imgIllustration
					}
					alt=""
					className="rounded border img-fluid mx-auto d-block w-75 h-75 p-2"/>
				<div className='font-weight-bold mt-3'>{player?.track?.title ? player.track.title : 'No music is playing' }</div>
				<div className='small'>{player?.track?.author ? player.track.author : '-' }</div>
				<div className="row mt-3">
					<div className='small m-auto'>Player Button Coming Soon</div>
					<div className="col d-none flex-wrap flex-md-nowrap justify-content-center">
						<button className='btn btn-link mr-1 text-muted' disabled={true}><i className="fa-solid fa-repeat"></i></button>
						<button className='btn btn-link mr-1' disabled={true} ><i className="fa-solid fa-backward-step"></i></button>
						{buttonPlayPause}
						<button className='btn btn-link mr-1' disabled={true}><i className="fa-solid fa-forward-step"></i></button>
						<button className='btn btn-link mr-1' disabled={true}><i className="fa-solid fa-shuffle"></i></button>
					</div>
				</div>
			</div>
		</div>
  );
}

export default App;
