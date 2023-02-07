import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as MovieIcon } from '../../../icon/movie.svg';
import Spinner from '../../Spinner';
import './style.css';

const img_url = 'https://image.tmdb.org/t/p/w342';

const StateEnum = {
    loading: 0,
    success: 1,
    error: 2
};

const Poster = ({ item }) => {
    const [state, setState] = useState(StateEnum.loading);

    useEffect(() => {
        if (item.poster) {
            const img = new Image();

            img.onload = () => setState(StateEnum.success);
            img.onerror = () => setState(StateEnum.error);

            img.src = img_url + item.poster;
        }
        else {
            setState(StateEnum.error);
        }
    }, [item.poster]);

    return (
        <NavLink
            to={ `/watch/${item.type}/${item.id}` }
            className='item'
        >
            <div className='poster'>{
                {
                    [StateEnum.loading]: <Spinner />,
                    [StateEnum.success]: <img src={img_url + item.poster} alt=''/>,
                    [StateEnum.error]: <><h1>{item.title}</h1><MovieIcon /></>
                }[state]
            }</div>
        </NavLink>
    );
};

export default Poster;