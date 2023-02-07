import { useParams } from 'react-router-dom';
import Player from '../Player';
import './style.css';

const Movie = () => {
   const path = useParams();

   return (
      <div className='movie'>
         <Player id={ path.id } />
      </div>
   );
};

export default Movie;
