import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function App() {

  let navigate = useNavigate();

  const [guildIdInput, setGuildIdInput] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const go = async (e, guildId) => {
		e.preventDefault();
    setButtonDisabled(true);
    navigate(`${guildId}`);
	}
  
  return (
    <form onSubmit={(e) => go(e, guildIdInput)}>
      <div className="input-group">
        <input
          type="number"
          value={guildIdInput}
          className="form-control"
          onInput={e => setGuildIdInput(e.target.value)}
          required={true} />
        <div className="input-group-append">
          <button id="btnSearch" className="btn btn-primary" type="submit" disabled={buttonDisabled}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
      <a href='https://support.discord.com/hc/en-us/articles/206346498' target="_blank" rel='noreferrer' className="form-text small"><i className="fa-solid fa-circle-question"></i> How to find guild / server id</a>
    </form>
  );
}

export default App;
