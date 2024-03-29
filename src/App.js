import React, {useEffect, useState} from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import './App.css';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featueredData, setFeatureueredData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false)

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

  useEffect(() =>{
    const scrollListener = () =>{
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () =>{
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return(
    <div className="page">

      <Header black={blackHeader}/>
      
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

      <footer>
        Feito por Guilherme Girotto <span role="img" aria-label="exclamação">❗</span><br/>
        Direito de imagens Netflix<br/>
        Dados Themoviedb.org

      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
            <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="carregando"/>
        </div>
      }

    </div>
  )
};