import imgIllustration from '../../images/undraw/happy-music.svg';

function App() {
  
  return (
    <section id="secHeader" className="row h-75 my-3 my-md-0 h-100">
			<div className="container my-auto">
				<div className="row align-items-center">
					<div className="col-12 col-md-6 order-md-2 text-center" data-aos="fade-left" data-aos-delay="100">
						<img className="img-fluid p-3 p-md-0" src={imgIllustration} alt="illustration" width="450px" />
					</div>
					<div className="col-12 col-md-6 text-center mt-4 mt-md-0" data-aos="fade-right">
						<h1 className="h2 text-md-left pt-3 pt-md-0">
							Discord Music Bot
						</h1>
						<p className="h3 text-md-left">
							<span id="headerTyped" className="text-primary"></span>
						</p>
						<p className="lead text-gray-300 text-md-left">
							Sunyi dan sepi di ruang hampa,<br />
							Masalah datang dan pergi sudah biasa,<br />
							Haaa, sendiri lagi~~<br />
						</p>
					</div>
				</div>
			</div>
		</section>
  );
}

export default App;
