import { Routes, Route, Navigate } from 'react-router-dom';
import NotFound from '../404';
import Layout from '../Layout';
import Browse from '../Browse';
import { Movie, Series } from '../Watch';
import './style.css';

const App = () => (
   <div className='App'>
      <Layout>
         <Routes>
            <Route index element={<Navigate to='browse' replace />} />
            <Route path='browse' element={<Browse />} />
            <Route path='watch/movie/:id' element={<Movie />}/>
            <Route path='watch/series/:id' element={<Series />} />
            <Route path='*' element={<NotFound />} />
         </Routes>
      </Layout>
   </div>
);

export default App;
