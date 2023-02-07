import { useSearchParams, useNavigate, useLocation, createSearchParams } from 'react-router-dom';
import { useRef } from 'react';

const Search = () => {
   const input = useRef();
   const navigate = useNavigate();
   const location = useLocation();
   const [params] = useSearchParams();

   // should be using useEffect and register and release event listener?
   window.onkeydown = e => {
      if (location.pathname !== '/browse')
         return;

      if (
         (e.keyCode >= 48 && e.keyCode <= 57) ||
         (e.keyCode >= 65 && e.keyCode <= 90) ||
         (e.keyCode === 8 && input.current.value) ||
         (e.keyCode === 32 && input.current.value)
      )
         input.current.focus();
   };

   const onChange = e => {
      const val = e.target.value;

      if (val) {
         navigate({
            pathname: '/browse',
            search: createSearchParams({
               q: val
            }).toString()
         });
      }
      else {
         input.current.blur();
         navigate('/browse');
      }
   };

   return (
      <input
         placeholder='Search'
         value={params.get('q') || ''}
         onChange={onChange}
         ref={input}
      />
   );
};

export default Search;
