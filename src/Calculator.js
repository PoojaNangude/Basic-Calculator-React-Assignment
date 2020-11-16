import { render } from '@testing-library/react';
import React, {useState,useEffect} from 'react';
// In advanced calculator
const Calculator = () => {

const [firstNum,setFirstNum]=useState(0);
const [secondNum,setSecondNum]=useState(0);
const [choice,setChoice]=useState('');
const [ans,setAns]=useState(0);
const [prev,setPrev]=useState([]);

const handleSubmit = (e) =>{
    e.preventDefault();
    console.log('called before');
    switch(choice){
        case '+':
            setAns(parseFloat(firstNum)+parseFloat(secondNum));
            break;

        case '-':
            setAns(parseFloat(firstNum)-parseFloat(secondNum));
            break;
        
        case '*':
            setAns(parseFloat(firstNum)*parseFloat(secondNum));
            break;

        case '/':
            setAns(parseFloat(firstNum)/parseFloat(secondNum));
            break;
    }
}


useEffect(()=>{
    const record={id: new Date().getTime().toString(),firstNum,choice,secondNum,ans};
    console.log(record);
    setPrev((prev) => {
        return [...prev,record];
    });
    console.log('in useeffect',ans);
},[ans]);

useEffect(()=>{
    console.log('in useeffect',prev);
},[prev]);

    return (
        <div>
            <h1>Basic Calculator</h1>
            <form>

                <div>
                    <label htmlFor="firstNum">Num 1 : </label>
                    <input  
                    type="number"
                    id="firstNum"
                    name="firstNum"
                    value={firstNum}
                    onChange={(e) => setFirstNum(e.target.value)}
                    />
                </div>
                <br></br>

                <div>
                    <label htmlFor="secondNum">Num 2 : </label>
                    <input
                    type="number"
                    id="secondNum"
                    name="secondNum"
                    value={secondNum}
                    onChange={(e) => setSecondNum(e.target.value)}
                    />
                </div>
                <br></br>

                <div onChange={(e) =>setChoice(e.target.value)}>
                    <input type="radio" value="+" name="choice" />Add
                    <input type="radio" value="-" name="choice" />Subtract
                    <input type="radio" value="*" name="choice" />Product
                    <input type="radio" value="/" name="choice" />Divide
                </div>
                <br></br>

                <button type="submit" onClick={handleSubmit}>Submit</button>

                <h3>ANS: {ans}</h3>
            </form>
            {
                prev.map((record,index)=>{
                    const {id,firstNum,choice,secondNum,ans}=record;
                    return (
                        <div key={id}>
                            <h4>{firstNum} {choice} {secondNum} = {ans}</h4>
                        </div>
                    );
                })}
        </div>
    );
}

export default Calculator;
