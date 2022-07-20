
function App() {
  
  return (
    <footer className="sticky-footer bg-white shadow-lg py-3">
			<div className="container my-auto">
				<div className="text-center my-auto">
					<small>
						&copy; <a href="https://instagram.com/The.Skinny.Rat" target={'blank'}>TheSkinnyRat</a> {new Date().getFullYear()}
						<div className="divider-y d-inline"></div>
						Made With&nbsp;
						<i className="fa-brands fa-node-js text-success"></i>&nbsp;
						<i className="fa-brands fa-react text-info"></i>&nbsp;
						<i className="fa-brands fa-bootstrap text-primary"></i>&nbsp;
						<i className="fa-solid fa-font-awesome text-info"></i>&nbsp;
					</small>
				</div>
			</div>
		</footer>
  );
}

export default App;
