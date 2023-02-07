import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import jetch from '../../../util/jetch';
import config from '../../../config';
import Player from '../Player';
import './style.css';

const Series = () => {
   const path = useParams();
   const [params, setParams] = useSearchParams();
   const [season, setSeason] = useState(0);
   const [episode, setEpisode] = useState(0);
   const [isLast, setIsLast] = useState(false);
   const [episodeNum, setEpisodeNum] = useState([]);

   useEffect(() => {
      (async () => {
         const req = `${config.API_URL}/tv/${path.id}?api_key=${config.API_KEY}`;
         const obj = await jetch(req);

         const seasons = obj.seasons.filter(x => x.season_number > 0);
         const episodes = seasons.map(x => x.episode_count);

         setEpisodeNum(episodes);
      })();
   }, [path.id]);

   useEffect(() => {
      setSeason(parseInt(params.get('s')) || 1);
      setEpisode(parseInt(params.get('e')) || 1);
   }, [params]);

   useEffect(() => (
      setIsLast(
         season === episodeNum.length &&
         episode === episodeNum[season - 1]
      )
   ), [season, episode, episodeNum]);

   const onChangeSeason = e => (
      setParams({
         s: e.target.value,
         e: 1
      })
   );

   const onChangeEpisode = e => (
      setParams({
         s: season,
         e: e.target.value
      })
   );

   const onNext = e => {
      if (episode < episodeNum[season - 1])
         setParams({
            s: season,
            e: episode + 1
         });
      else if (season < episodeNum.length)
         setParams({
            s: season + 1,
            e: 1
         });
   };

   return (
      <div className='series'>
         <Player id={ path.id } season={ season } episode={ episode } />

         <div className='selector'>
            <select
               value={ season }
               onChange={ onChangeSeason }
            >{
               episodeNum.map((_, idx) => (
                  <option value={ idx+1 }>Season { idx+1 }</option>
               ))
            }</select>

            <select
               value={ episode }
               onChange={ onChangeEpisode }
            >{
               [...Array(episodeNum[season - 1])].map((_, idx) => (
                  <option value={ idx+1 }>Episode { idx+1 }</option>
               ))
            }</select>

            <button onClick={ onNext } disabled={ isLast }>Next</button>
         </div>
      </div>
   );
};

export default Series;