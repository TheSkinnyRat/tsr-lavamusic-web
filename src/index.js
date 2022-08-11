import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import "./vendor/bootstrap/bootstrap.bundle.min";
import "./vendor/sb-admin-2/css/sb-admin-2.min.css";
import "./vendor/sb-admin-2/js/sb-admin-2.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './styles/Theme.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import Index from './components/pages/Index';
import NotFound from './components/pages/NotFound';
import App from './components/pages/App';
import Guild from './components/pages/Guild';
import GuildIndex from './components/pages/GuildIndex';
import GuildRoom from './components/pages/GuildRoom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Index />} />
        <Route path="guild" element={<Guild />}>
          <Route index element={<GuildIndex />} />
          <Route path=":guildId" element={<GuildRoom />} >
            <Route path="room" element={<GuildRoom />} />
          </Route>
        </Route>
        <Route path="page" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
