import Header from './Header';
import './style.css';

const Layout = props => (
   <>
      <Header />
      <main>{props.children}</main>
   </>
);

export default Layout;
