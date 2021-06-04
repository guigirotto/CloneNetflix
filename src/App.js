import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';


export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featueredData, setFeatureueredData] = useState(null);

  useEffect(() => {
    const loadAll = async () =>{
      // Pegando a lista de filmes

      let list =await Tmdb.getHomeList();
      setMovieList(list);

          // pegando filme em destaque

      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeatureueredData(chosenInfo);
    }


    
    loadAll();
  }, []);


  return(
    <div className="page">

      {featueredData && 
        <FeaturedMovie item={featueredData}/>
      }
      

      <section className="lists">
          {movieList.map((item, key)=>(
            <div>
              <MovieRow key={key} title={item.title} items={item.items}/>
            </div>
          ))}
      </section>
    </div>
  )
};