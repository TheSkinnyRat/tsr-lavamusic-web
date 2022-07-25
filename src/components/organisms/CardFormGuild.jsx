import FormGuild from '../atoms/FormGuild';

function App({setAlert, setSongs}) {
  
  return (
    <div className="card mb-2 mb-md-3 shadow-sm">
			<div className="card-header font-weight-bold">
				Enter Discord Guild (Server) ID
			</div>
			<div className="card-body">
				<FormGuild setAlert={setAlert} setSongs={setSongs} />
			</div>
		</div>
  );
}

export default App;
