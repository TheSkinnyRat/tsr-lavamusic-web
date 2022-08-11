import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../../api/socket';
import imgIllustration from '../../images/undraw/happy-music.svg';
import api from '../../api';

function App({setAlert}) {
	const playerUpdateSocket = socket.player;
  const { guildId } = useParams();
	
	const [buttonPlayPause, setButtonPlayPause] = useState('play');
	const [buttonLoop, setButtonLoop] = useState(false);
	const initialPlayer = {
		paused: false,
		repeat: false,
		track: {},
	}
	const [player, setPlayer] = useState(initialPlayer);
	const [buttonDisabled, setButtonDisabled] = useState(true);

	useEffect(() => {
    playerUpdateSocket.on('player:playerUpdate:success', (player) => {
			setPlayer(player);
			if (player?.track && player?.track?.identifier) {
				setButtonPlayPause(player.paused ? 'play' : 'pause');
				setButtonLoop(player.repeat);
				setButtonDisabled(false);
			} else {
				setButtonPlayPause('play');
				setButtonDisabled(true);
			}
    });

    playerUpdateSocket.on('player:playerUpdate:error', (error) => {
			setAlert({ type: 'danger', title: `[Websocket] playerUpdate Error: ${error}`, loading: false });
			setButtonPlayPause('play');
			setButtonLoop(false);
			setButtonDisabled(true);
    });

		playerUpdateSocket.emit('player:playerUpdate', guildId);

    return () => {
      playerUpdateSocket.off('player:playerUpdate:success');
      playerUpdateSocket.off('player:playerUpdate:error');
    };
  }, [setAlert, playerUpdateSocket, guildId]);

	const pause = async (e) => {
		e.preventDefault();
		setButtonDisabled(true);
		setAlert({ type: 'primary', title: `Pausing player`, loading: true });
		try {
			const response = await api.guildPause(guildId);
			if(response.success) {
				setAlert({ type: 'success', title: response?.success?.data?.message, loading: false });
			}
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
			setButtonDisabled(false);
		}
	}

	const unpause = async (e) => {
		e.preventDefault();
		setButtonDisabled(true);
		setAlert({ type: 'primary', title: `Playing player`, loading: true });
		try {
			const response = await api.guildUnpause(guildId);
			if(response.success) {
				setAlert({ type: 'success', title: response?.success?.data?.message, loading: false });	
			}
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
			setButtonDisabled(false);
		}
	}

	const next = async (e) => {
		e.preventDefault();
		setButtonDisabled(true);
		setAlert({ type: 'primary', title: `Skipping track`, loading: true });
		try {
			const response = await api.guildNext(guildId);
			if(response.success) {
				setAlert({ type: 'success', title: response?.success?.data?.message, loading: false });
			}
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
			setButtonDisabled(false);
		}
	}

	const previous = async (e) => {
		e.preventDefault();
		setButtonDisabled(true);
		setAlert({ type: 'primary', title: `Rewound track`, loading: true });
		try {
			const response = await api.guildPrevious(guildId);
			if(response.success) {
				setAlert({ type: 'success', title: response?.success?.data?.message, loading: false });
			}
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
			setButtonDisabled(false);
		}
	}

	const loop = async (e) => {
		e.preventDefault();
		setButtonDisabled(true);
		setAlert({ type: 'primary', title: `Looping track`, loading: true });
		try {
			const response = await api.guildLoop(guildId);
			if(response.success) {
				setAlert({ type: 'success', title: response?.success?.data?.message, loading: false });
			}
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
			setButtonDisabled(false);
		}
	}

	const unloop = async (e) => {
		e.preventDefault();
		setButtonDisabled(true);
		setAlert({ type: 'primary', title: `Unlooping track`, loading: true });
		try {
			const response = await api.guildUnloop(guildId);
			if(response.success) {
				setAlert({ type: 'success', title: response?.success?.data?.message, loading: false });
			}
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
			setButtonDisabled(false);
		}
	}

	const shuffle = async (e) => {
		e.preventDefault();
		setButtonDisabled(true);
		setAlert({ type: 'primary', title: `Shuffling track`, loading: true });
		try {
			const response = await api.guildShuffle(guildId);
			if(response.success) {
				setAlert({ type: 'success', title: response?.success?.data?.message, loading: false });
			}
		} catch (error) {
			setAlert({ type: 'danger', title: `Error: ${error?.response?.data?.error?.message || 'Unknown Error'}`, loading: false });
			setButtonDisabled(false);
		}
	}
  
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
					<div className="col d-flex flex-wrap flex-md-nowrap justify-content-center">
						<button
							className={`btn btn-link mr-1 ${buttonLoop ? 'text-success' : ''}`}
							onClick={buttonLoop ? e => unloop(e) : e => loop(e)}
							disabled={buttonDisabled}>
							<i className="fa-solid fa-repeat"></i>
							</button>
						<button className='btn btn-link mr-1' onClick={e => previous(e)} disabled={buttonDisabled} ><i className="fa-solid fa-backward-step"></i></button>
						<button
							className='btn btn-outline-primary mr-1'
							onClick={buttonPlayPause === 'play' ? e => unpause(e) : e => pause(e)}
							disabled={buttonDisabled}>
							<i className={`fa-solid fa-${buttonPlayPause}`}></i>
						</button>
						<button className='btn btn-link mr-1' onClick={e => next(e)} disabled={buttonDisabled}><i className="fa-solid fa-forward-step"></i></button>
						<button className='btn btn-link mr-1' onClick={e => shuffle(e)} disabled={buttonDisabled}><i className="fa-solid fa-shuffle"></i></button>
					</div>
				</div>
			</div>
		</div>
  );
}

export default App;
