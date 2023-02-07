import { NavLink } from 'react-router-dom';
import Search from './Search';
import './style.css';

const Header = () => (
   <header>
      <ul>
         <li><NavLink to='/browse'><h1>cosmo</h1></NavLink></li>
      </ul>
      <ul>
         <li><Search /></li>
      </ul>
   </header>
);

export default Header;
