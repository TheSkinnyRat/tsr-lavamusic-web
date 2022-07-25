import { useEffect } from 'react';
import '../../styles/App.css';
import CardFormGuild from '../organisms/CardFormGuild';

function App() {

  useEffect(() => {
    document.title = `TSR Music Bot`;
  });
  
  return (
    <section id='secGuildIndex' className='row h-100'>
      <div className="container">
        <div className="row h-100">
          <div className="col-12 col-md-10 col-lg-7 m-auto">
            <CardFormGuild />
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
