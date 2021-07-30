import './App.css';
import { useState } from 'react';
import background from './dcc.png'
import card from './card.png'
import Draggable from 'react-draggable';
import { cond } from 'lodash';


function App() {
    const [score, setScore] = useState(0);
    const [lastIndex, setLastIndex] = useState(0);
    const [displayNoneList, setDisplayNoneList] = useState([]);

  let cards = [
    {id: 0 ,value: 25},
    {id: 2 ,value: 42},
    {id: 1 ,value: 30},
    {id: 3 ,value: 59},
  ]

  const checkValue = (currentValue) => {
      let midValueExist = false
      const requiredCard = cards.filter(c => c.id === lastIndex);
      cards.map((card) => {
          if(card.value >= requiredCard[0].value && card.value < currentValue){
            midValueExist = true;
          }
      })
      return midValueExist;
  } 

  const checkNone = (currentId) => {
      let none = false
      displayNoneList.map((item) => {
        if(item.id === currentId){
          none = true
        }
      })
      return none;
  } 

  return (
    <div style={{justifyContent: "center"}}>
     
    <div className="App" style={{textAlign: "center", display: "flex", backgroundImage: `url(${background})`, backgroundRepeat: "no-repeat", backgroundSize: 500, height: 500}}>
      {cards.map((cardItem) => (
        <Draggable key={cardItem.id} position={{x: 0, y: 0}}
        onStop={(e) => {if(e.clientY > 271 && e.clientX > 162 && e.clientY < 398 && e.clientX < 321){
          // if(cards[lastIndex].value === cardItem.value){
          if(!checkValue(cardItem.value)){
            setScore(score+10)
            setLastIndex(cardItem.id + 1)
            let currentDisplayNoneList = [...displayNoneList]
            currentDisplayNoneList.push({id: cardItem.id});
            setDisplayNoneList(currentDisplayNoneList);
          }else{
            setScore(score-5)
          }
        }else {
      
        }}}>
         <div style={{display: `${checkNone(cardItem.id) ? "none": "block"}`, backgroundImage: `url(${card})`, backgroundRepeat: "no-repeat", backgroundSize: 50, height: 100, width: 50}}>
            <p>{cardItem.value}</p>
         </div>
        </Draggable>
      ))}
      <h3 style={{paddingLeft: 50}}>Current Score= {score}</h3>
      <button style={{margin: 20, height: 30}} onClick={() => {setScore(0); setLastIndex(0); setDisplayNoneList([])}}>Reset</button>
    </div>
    </div>
  );
}
// YU : 271
// XL : 162
// YD : 398
// XR : 321
export default App;
