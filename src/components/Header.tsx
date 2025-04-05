import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <h1>Objeções de Clientes</h1>
      <nav>
        <ul>
          <li><Link to="/">Objeções</Link></li>
          <li><Link to="/dashboard">Painel</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
