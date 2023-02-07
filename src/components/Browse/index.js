import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import jetch from '../../util/jetch';
import config from '../../config';
import Poster from './Poster';
import './style.css';

const Browse = () => {
   const [params] = useSearchParams();
   const [content, setContent] = useState([]);
   const [itemsPer, setItemsPer] = useState(5);
   const [page, setPage] = useState(0);

   useEffect(() => {
      setPage(0);
      const query = params.get('q');

      (async () => {
         if (query) {
            const search = async type => {
               const res = `${config.API_URL}/search/${type}?api_key=${config.API_KEY}&query=${query}`;
               const obj = await jetch(res);
               return obj.results;
            };

            const movies = await search('movie');
            const series = await search('tv');

            movies.forEach(x => x.type = 'movie');
            series.forEach(x => x.type = 'series');

            const items = [...movies, ...series];

            items.sort((a, b) => b.popularity - a.popularity);

            setContent(items.map(item => ({
               id: item.id,
               title: item.title,
               poster: item.poster_path,
               type: item.type
            })));
         }
         else {
            const req = `${config.API_URL}/movie/popular?api_key=${config.API_KEY}`;
            const obj = await jetch(req);

            setContent(obj.results.map(item => ({
               id: item.id,
               title: item.title,
               poster: item.poster_path,
               type: 'movie'
            })));
         }
      })();
   }, [params]);

   useEffect(() => {
      const style = document.documentElement.style;
      style.setProperty('--page-num', page);
   }, [page]);

   useEffect(() => {
      const style = document.documentElement.style;
      style.setProperty('--items-per-page', itemsPer);
   }, [itemsPer]);

   const onResize = () => {
      const width = window.innerWidth;
      
      // should use media query api
      if (width < 1250)
         setItemsPer(4);
      else
         setItemsPer(5);
   };

   // should register event listener in useEffect
   window.onresize = onResize;

   useEffect(onResize, []);

   return (
      <div className='browse'>
         <button
            className='control control-left'
            onClick={() => setPage(page-1)}
            disabled={page <= 0}
         >&#8249;</button>

         <div className='slider'>{
            content.map(item => (
               <Poster item={item} key={item.id}/>
            ))
         }</div>

         <button
            className='control control-right'
            onClick={() => setPage(page+1)}
            disabled={(content.length / itemsPer) <= page + 1}
         >&#8250;</button>
      </div>
   );
};

export default Browse;