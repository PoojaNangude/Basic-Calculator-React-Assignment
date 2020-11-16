import { render } from '@testing-library/react';
import React, {useState,useEffect} from 'react';
// In advanced bracket calculator
//Trying to handle brackets
const Calculator = () => {
const [expression,setExpression]=useState('');
const [ans,setAns]=useState(0);
let exp=0;

const evaluate =(num1,opr,num2)=>{
    switch(opr){
        case '+':
            exp=parseFloat(num1)+parseFloat(num2);
            break;

        case '-':
            exp=parseFloat(num1)-parseFloat(num2);
            break;

        case '/':
            exp=parseFloat(num1)/parseFloat(num2);
            break;

        case '*':
            exp=parseFloat(num1)*parseFloat(num2);
            break;
    }
    return(parseFloat(exp));
}


const handleSubmit = (e) =>{
    e.preventDefault();
    let pref=['/','*'];
    let separators = ['\\\+','\\\-','\\\/','\\\*','\\\(','\\\)'];
    let splitexp=expression.split(new RegExp("([" + separators.join("") + "])+"));

    for(let opr of pref){
        for(let i=0;i<splitexp.length;i++){
            if(splitexp[i]===opr){
                console.log(splitexp[i-1],opr,splitexp[i+1]);
                exp=evaluate(splitexp[i-1],opr,splitexp[i+1]);
                console.log(exp);
                splitexp[i-1]=exp;
                splitexp.splice(i,2);
                console.log(splitexp);
            }
        }
    }

    while(splitexp.length!==1){
        splitexp[0]=evaluate(splitexp[0],splitexp[1],splitexp[2]);
        splitexp.splice(1,2);
    }
    console.log(splitexp[0]);
    setAns(splitexp[0]);
}

    return (
        <div>
            <h1>Advanced Calculator</h1>
            <form>

                <div>
                    <label htmlFor="expression">Enter mathematical expression : </label>
                    <input
                    type="text"
                    id="expression"
                    name="expression"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    />
                </div>
                <br></br>

                <button type="submit" onClick={handleSubmit}>Submit</button>

                <h3>ANS: {ans}</h3>
            </form>
        </div>
    );
}

export default Calculator;
