import Head from 'next/head';
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import ImgModal from '../components/ImgModal';
import ImgModalWon from '../components/ImgModalWon';
import Popup from '../components/Popup';
import {server} from '../config';
import {movielinenumber} from '../config';
import Autosuggest from 'react-autosuggest';
import Link from 'next/link';
import Router from 'next/router';

export default function Home(articles) {


  const a = articles.articles[movielinenumber-2];
  const [found, setFound] = useState(false);
  const [first, setFirst] = useState(false);
  const [lostgame, setLostGame] = useState(false);
  const [count, setCount] = useState(0);
  const [scores, setScores] = useState([]);
  const colors = ['white', '#edeae5', '#f4e878', '#37be75'];
  const [name, setName] = useState([]);
  
  useEffect (() => {
    //localStorage.clear()
    
    /*
    localStorage.removeItem('current_guesses');
    localStorage.removeItem('matchscores');
    localStorage.removeItem('attempts');
    localStorage.removeItem('won_game');
    */

    const last_play = JSON.stringify(localStorage.getItem("last_played"));

    var toda = new Date();
    const d = String(toda.getDate()).padStart(2, '0');
    const m = String(toda.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyy = toda.getFullYear();
    toda = m + '/' + d + '/' + yyy;
    
    if (last_play != JSON.stringify(toda)) {
        localStorage.removeItem('current_guesses');
        localStorage.removeItem('matchscores');
        localStorage.removeItem('attempts');
        localStorage.removeItem('won_game');
        localStorage.removeItem('saved');
      
    }

    //var history = JSON.parse(localStorage.getItem("history"));
    console.log('last_play:', last_play);
    if(last_play == 'null') {
      console.log("FIRST TIME");
      setFirst(true);
      setTimeout(() => {
        Router.push('/about')
      }, 1000)
      localStorage.setItem('last_played', toda);
    }
    
    localStorage.setItem('last_played', toda);
    
    var attempts = parseInt(localStorage.getItem("attempts"));
    if(isNaN(attempts)) {
      attempts = 0;
    }
    setCount(attempts);
    
    
    var won_game = JSON.parse(localStorage.getItem("won_game"));
    if(won_game != null) {
      console.log("Won game: ", won_game);
      if (won_game) {
        setFound(Boolean(won_game));
      }
      else {
        setFound(Boolean(won_game));
        setLostGame(true);
      }
      
    }

    var existingEntries = JSON.parse(localStorage.getItem("current_guesses"));
    if(existingEntries == null) existingEntries = [];
    setName(existingEntries);
    
    var matchscores = JSON.parse(localStorage.getItem("matchscores"));
    if(matchscores == null) {
      matchscores = [];
    }
    setScores(matchscores);
    
    //*/

  }, [])

  class App1 extends React.Component {
    constructor(props) {
      super();
  
      this.state = {
        value: '',
        suggestions: []
      };   
      this.articles = props.data.articles;
  
    }
  
    onChange = (event, { newValue, method }) => {
      this.setState({
        value: newValue
      });
    };
    
    onSuggestionsFetchRequested = ({ value }) => {
      this.setState({
        suggestions: getSuggestions(value,this.articles)
      });
    };
  
    onSuggestionsClearRequested = () => {
      this.setState({
        suggestions: []
      });
    };

  
    render() {
      const { value, suggestions } = this.state;
      const inputProps = {
        value,
        onChange: this.onChange
      };
  
      return (
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          onSuggestionSelected={onSuggestionSelected}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} 
          />
      );
    }
  }

  function getSuggestionValue(suggestion) {
    //setInputName(suggestion.name);
    return suggestion.name;
    
  }

  function onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    var b = retrieve_input_data(suggestion.name, articles.articles);
    console.log("b: ", b );

    
    const arr = getqueryscore(a,b);
    console.log('arr: ', arr);

    
    var existingEntries = JSON.parse(localStorage.getItem("current_guesses"));
    if(existingEntries == null) existingEntries = [];
    existingEntries.push(b);
    localStorage.setItem("current_guesses", JSON.stringify(existingEntries));
    //localStorage.clear()
    setName(existingEntries);
  
    var matchscores = JSON.parse(localStorage.getItem("matchscores"));
    if(matchscores == null) {
      matchscores = [];
    }
    console.log('matchscores:', matchscores);
    matchscores.push(arr);
    localStorage.setItem("matchscores", JSON.stringify(matchscores));
    setScores(matchscores);
    
    var result = []
    for (var i = 0; i < arr.length; i ++) {
      if (typeof(arr[i]) == 'number'){
        result.push(arr[i])
      }
    }
    //localStorage.setItem("current_guesses", JSON.stringify(name));
    if (result.every( (val, i, arr) => val === 3 )) {
      setFound(true);
      localStorage.setItem("won_game", true);
    }
    if (count == 5) {
      setLostGame(true);
      localStorage.setItem("won_game", false);
    }
    //console.log("original count: ", count);
    localStorage.setItem("attempts", count+1);
    setCount(count + 1);
    //console.log("count changed to ", count);
  }


  //const x = App.retrieve_input_data(articles.articles);
  //console.log(x);
  const modalprops = {'found': found, 'lostgame': lostgame, 'count': count, 'a': a};
  if (first) {
    
    //return (<Redirect to="/about" />);
  }

  return (
    <div>
      <Head>
      <title>Twordle</title>  
      </Head>
      <div className="App">
      <div className="auto-container">
        {
          !found && !lostgame ? 
          //<Auto data ={articles}/>
          <App1 data={articles}/>
          : null
        }
      </div>
      {
        found || lostgame ? 
        <div>
          {
            updated_local_storage(count, found)
          }
          <ImgModalWon text= {modalprops}/>
        </div>
        :<ImgModal/>
      }
    </div>
      <table>
      <tbody>
        <tr>
          <th>{count >= 1 && "Name"}</th>
          <th>{count >= 1 && "Year"}</th>
          <th>{count >= 1 && "Genre"}</th>
          <th>{count >= 1 && "Director"}</th>
          <th>{count >= 1 && "Rating"}</th>
          <th>{count >= 1 && "Length(min)"}</th>
          <th>{count >= 1 && "Main Actor(s)"}</th>
        </tr>
        { count >= 1 &&
              <tr>
              <td>{name[0].name}</td>
              <td bgcolor={colors[scores[0][0]]}>{scores[0][1]+ name[0].year}</td>
              <td bgcolor={colors[scores[0][2]]}>{name[0].genre}</td>
              <td bgcolor={colors[scores[0][3]]}>{name[0].director}</td>
              <td bgcolor={colors[scores[0][4]]}>{scores[0][5]+name[0].rating}</td>
              <td bgcolor={colors[scores[0][6]]}>{scores[0][7]+name[0].len.replace(" min", '')}</td>
              <td bgcolor={colors[scores[0][8]]}>{name[0].actors}</td>
            </tr>
        }
        { count >= 2 &&
              <tr>
              <td>{name[1].name}</td>
              <td bgcolor={colors[scores[1][0]]}>{scores[1][1] + name[1].year}</td>
              <td bgcolor={colors[scores[1][2]]}>{name[1].genre}</td>
              <td bgcolor={colors[scores[1][3]]}>{name[1].director}</td>
              <td bgcolor={colors[scores[1][4]]}>{scores[1][5] +name[1].rating}</td>
              <td bgcolor={colors[scores[1][6]]}>{scores[1][7] +name[1].len.replace(" min", '')}</td>
              <td bgcolor={colors[scores[1][8]]}>{name[1].actors}</td>
            </tr>
        }
        { count >= 3 &&
              <tr>
              <td>{name[2].name}</td>
              <td bgcolor={colors[scores[2][0]]}>{scores[2][1] +name[2].year}</td>
              <td bgcolor={colors[scores[2][2]]}>{name[2].genre}</td>
              <td bgcolor={colors[scores[2][3]]}>{name[2].director}</td>
              <td bgcolor={colors[scores[2][4]]}>{scores[2][5] +name[2].rating}</td>
              <td bgcolor={colors[scores[2][6]]}>{scores[2][7] +name[2].len.replace(" min", '')}</td>
              <td bgcolor={colors[scores[2][8]]}>{name[2].actors}</td>
            </tr>
        }
        { count >= 4 &&
              <tr>
              <td>{name[3].name}</td>
              <td bgcolor={colors[scores[3][0]]}>{scores[3][1] +name[3].year}</td>
              <td bgcolor={colors[scores[3][2]]}>{name[3].genre}</td>
              <td bgcolor={colors[scores[3][3]]}>{name[3].director}</td>
              <td bgcolor={colors[scores[3][4]]}>{scores[3][5]+ name[3].rating}</td>
              <td bgcolor={colors[scores[3][6]]}>{scores[3][7] + name[3].len.replace(" min", '')}</td>
              <td bgcolor={colors[scores[3][8]]}>{name[3].actors}</td>
            </tr>
        }
        { count >= 5 &&
              <tr>
              <td>{name[4].name}</td>
              <td bgcolor={colors[scores[4][0]]}>{scores[4][1] + name[4].year}</td>
              <td bgcolor={colors[scores[4][2]]}>{name[4].genre}</td>
              <td bgcolor={colors[scores[4][3]]}>{name[4].director}</td>
              <td bgcolor={colors[scores[4][4]]}>{scores[4][5] + name[4].rating}</td>
              <td bgcolor={colors[scores[4][6]]}>{scores[4][7] + name[4].len.replace(" min", '')}</td>
              <td bgcolor={colors[scores[4][8]]}>{name[4].actors}</td>
            </tr>
        }
        { count >= 6 &&
              <tr>
              <td>{name[5].name}</td>
              <td bgcolor={colors[scores[5][0]]}>{scores[5][1] + name[5].year}</td>
              <td bgcolor={colors[scores[5][2]]}>{name[5].genre}</td>
              <td bgcolor={colors[scores[5][3]]}>{name[5].director}</td>
              <td bgcolor={colors[scores[5][4]]}>{scores[5][5] + name[5].rating}</td>
              <td bgcolor={colors[scores[5][6]]}>{scores[5][7] + name[5].len.replace(" min", '')}</td>
              <td bgcolor={colors[scores[5][8]]}>{name[5].actors}</td>
            </tr>
        }
        </tbody>
      </table>
    </div>
  )
}


export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/moviedata`)
  const articles = await res.json()

  return {
    props: {
      articles,
    },
  }
}

function retrieve_input_data(inputName, articles) {
  var input = inputName;
  for (var i =0; i < articles.length; i++) {
    if (articles[i].name.toLowerCase() == input.toLowerCase()) {
      return articles[i];
    }
  }
  console.log('Not a valid movie');
}

function updated_local_storage(count, found) {

  const saved = JSON.stringify(localStorage.getItem("saved"));
  if (saved != JSON.stringify('true')) {
    console.log('not saved already');
    var history = JSON.parse(localStorage.getItem("history"));
    if(history == null) history = {};
    var key = count.toString() + "a";
    if (!found) key = "10a";
    if (key in history) {
      const val = history[key];
      history[key] = val + 1;
      //console.log("history:", history);
    }
    else {
      //console.log("key1:", key);
      history[key] = 1;
    }
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("saved", true);
  }

}


//0: hidden, 1: not correct, 2: close, 3: correct
  //[year, year_symbol, genre, director, rating, rating_symbol, len, len_symbol, actors]
function getqueryscore(a, b) {
  //console.log('a: ', a);
  //console.log('b: ', b);
  var boolarr = [];
  for (var i = 0; i < 6; i++) {
    boolarr.push(0);
  }
  //year
  if (b.year) {
    var yeardiff = Math.abs(b.year - a.year);
    if (b.year <= a.year) {
      boolarr[1] = "↑";
    }
    else {
      boolarr[1] = "↓";
    }
    if (yeardiff <= 2) {
      if (yeardiff == 0) {
        boolarr[0] = 3;
        boolarr[1] = "";
      }
      else {
        boolarr[0] = 2;
      }
    }
    else {
      boolarr[0] = 1;
    }
  }

  //genre
  if (b.genre) {
    //console.log("a:", a.genre)
    //console.log("b:", b.genre)
    var dict = {};
    const agenre = a.genre.split(",");
    for (var i = 0; i < agenre.length; i++) {
      const astr = agenre[i].replace(/\s/g, "");
      dict[astr] = 1;
    }
    const bgenre = b.genre.split(",");
    for (var i = 0; i < bgenre.length; i++) {
      const bstr = bgenre[i].replace(/\s/g, "");
      if (bstr in dict) {
        dict[bstr] += 1;
      }
      else {
        dict[bstr] = 1;
      }
    }
    var sum = 0;
    var num_entries = 0;
    for (const [key, value] of Object.entries(dict)) {
      num_entries += 1; 
      sum += value;
    }
    const avg = sum/num_entries
    if (avg == 2) {
      boolarr[2] = 3;
    }
    else if(avg > 1) {
      boolarr[2] = 2;
    }
    else {
      boolarr[2] = 1;
    }
  }

  //director
  if (b.director) {
    if (a.director == b.director) {
      boolarr[3] = 3;
    }
    else {
      boolarr[3] = 1;
    }
  }

  //rating
  if (b.rating) {
    const ratingdiff = Math.abs(parseFloat(b.rating) - parseFloat(a.rating));
    const diff = parseFloat(b.rating) - parseFloat(a.rating);
    if (diff < 0) {
          boolarr[5] = "↑";
        }
        else {
          boolarr[5] = "↓";
        }
    if (ratingdiff.toFixed(2) <= .2) {
      if (ratingdiff == 0) {
        boolarr[4] = 3;
        boolarr[5] = "";
      }
      else {
        boolarr[4] = 2;
        
      }
    }
    else {
      boolarr[4] = 1;
    }
  }

  //len
  if (b.len) {
    const alen = a.len.replace(" min", '');
    const blen = b.len.replace(" min", '');
    const lendiff = Math.abs(parseInt(blen) - parseInt(alen));
    const diff = parseInt(blen) - parseInt(alen);
    if (diff < 0) {
      boolarr[7] = "↑";
    }
    else {
      boolarr[7] = "↓";
    }
    if (lendiff <= 10) {
      if (lendiff == 0) {
        boolarr[6] = 3;
        boolarr[7] = "";
      }
      else {
        boolarr[6] = 2;
      }
    } 
    else {
      boolarr[6] = 1;
    }
  } 

  //actors
  if (b.actors) {
    //console.log("a:", a.genre)
    //console.log("b:", b.genre)
    var dict = {};
    const aactors = a.actors.split(",");
    for (var i = 0; i < aactors.length; i++) {
      const astr = aactors[i].replace(/\s/g, "");
      dict[astr] = 1;
    }
    const bactors = b.actors.split(",");
    for (var i = 0; i < bactors.length; i++) {
      const bstr = bactors[i].replace(/\s/g, "");
      if (bstr in dict) {
        dict[bstr] += 1;
      }
      else {
        dict[bstr] = 1;
      }
    }
    var sum = 0;
    var num_entries = 0;
    for (const [key, value] of Object.entries(dict)) {
      num_entries += 1; 
      sum += value;
    }
    const avg = sum/num_entries
    if (avg == 2) {
      boolarr[8] = 3;
    }
    else if(avg > 1) {
      boolarr[8] = 2;
    }
    else {
      boolarr[8] = 1;
    }
    //console.log(dict)

  }

  return boolarr;
}

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value, article) {
  const escapedValue = escapeRegexCharacters(value.trim());
  //console.log(value);
  //setInputName(value);
  //console.log(inputname);
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  const result = article.filter(language => regex.test(language.name));
  const
    keys = ['name'],
    filtered = result.filter(
        (s => o => 
            (k => !s.has(k) && s.add(k))
            (keys.map(k => o[k]).join('|'))
        )
        (new Set)
    );
  return filtered;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}
