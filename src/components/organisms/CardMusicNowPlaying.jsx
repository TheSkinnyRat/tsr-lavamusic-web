import imgIllustration from '../../images/undraw/happy-music.svg';

function App() {
  
  return (
    <div className="card">
			<div className="card-body text-center">
				<p className='font-weight-bold'>Now Playing</p>
				<img src={imgIllustration} alt="" className="rounded border img-fluid mx-auto d-block w-75 h-75 p-2"/>
				<div className='font-weight-bold mt-3'>Coming Soon</div>
				<div className='small'>This Feature is coming soon</div>
				<div className="row mt-3">
					<div className="col">
						<button className='btn btn-link mr-1'><i className="fa-solid fa-repeat"></i></button>
						<button className='btn btn-link mr-1'><i className="fa-solid fa-backward-step"></i></button>
						<button className='btn btn-outline-primary mr-1'><i className="fa-solid fa-play"></i></button>
						<button className='btn btn-link mr-1'><i className="fa-solid fa-forward-step"></i></button>
						<button className='btn btn-link mr-1'><i className="fa-solid fa-shuffle"></i></button>
					</div>
				</div>
			</div>
		</div>
  );
}

export default App;
