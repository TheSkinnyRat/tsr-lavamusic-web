import { Link } from 'react-router-dom';

function App() {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white topbar h-auto container shadow-sm fixed-top">
		  <div className="">
		    <Link className="navbar-brand d-flex mr-auto text-primary" to="/">
		      <span className="font-weight-bold mx-1">
						<i className="fa-solid fa-circle-play"></i> TSR Music Bot「BETA」
		      </span>
		    </Link>
		  </div>

		  <div className="topbar-divider d-none d-lg-block"></div>

		  <div className="navbar-text">
		    {/* <a href="pages/pesanan.html" className="btn btn-primary btn-sm text-white">
          <i className="fas fa-concierge-bell fa-lg"></i>
          <div className="d-none d-sm-inline px-1">Pesanan</div>
          <span className="badge badge-pill badge-light">7</span>
        </a> */}

		    <button className="btn btn-link btn-sm d-lg-none rounded-circle" type="button" data-toggle="collapse" data-target="#navToggler1" aria-controls="navToggler1" aria-expanded="false" aria-label="Toggle navigation">
		      <i className="fa fa-bars"></i>
		    </button>
			</div>

		  <div className="collapse navbar-collapse" id="navToggler1">
		    <hr className="d-lg-none m-0" />
		    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item p-1 p-lg-0">
		        <Link to="/" className="btn btn-link text-decoration-none mr-1 btn-sm">
							<i className="fa-solid fa-house"></i> Home
		        </Link>
		      </li>
		    </ul>
		  </div>
		</nav>
  );
}

export default App;
