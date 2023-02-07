import { useEffect, useState } from 'react';
import Spinner from '../../Spinner';
import './style.css';

const vid_url = 'https://v2.vidsrc.me/embed/';

const StateEnum = {
   loading: 0,
   success: 1,
   error: 2,
};

const Player = ({ id, season, episode }) => {
   const [src, setSrc] = useState('');
   const [state, setState] = useState(StateEnum.loading);

   useEffect(() => {
      if (season === 0 || episode === 0)
         return;

      const url = `${vid_url}${id}/${season}-${episode}`;

      fetch(url, {method: 'head'})
         .then(() => setSrc(url))
         .catch(() => setState(StateEnum.error));
   }, [id, season, episode]);

   return (
      <div className='player'>
         { src &&
            <iframe 
               title='player'
               allowFullScreen={ true }
               onLoad={() => setState(StateEnum.success)}
               hidden={state !== StateEnum.success}
               src={ src }
            />
         }
         {{
            [StateEnum.loading]: <Spinner />,
            [StateEnum.error]: <h1>Not Available</h1>
         }[state]}
      </div>
   );
};

export default Player;
