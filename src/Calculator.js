import { render } from '@testing-library/react';
import React, {useState,useEffect} from 'react';
// In advanced calculator

const  eval = (num1,opr,num2) =>{
    const [exp,setExp]=useState(0);
    switch(opr){
        case '+':
            setExp(parseFloat(num1)+parseFloat(num2));
            break;
        case '-':
            setExp(parseFloat(num1)-parseFloat(num2));
            break;
        case '/':
            setExp(parseFloat(num1)/parseFloat(num2));
            break;
        case '*':
            setExp(parseFloat(num1)*parseFloat(num2));
            break;
    }
    return(exp.toString());
}

const Calculator = () => {

const [expression,setExpression]=useState('');
const [ans,setAns]=useState(0);

const handleSubmit = (e) =>{
    e.preventDefault();
    let pref=['/','*','+','-'];
    let separators = ['\\\+','\\\-','\\\/','\\\*','\\\(','\\\)'];
    let splitexp=expression.split(new RegExp("([" + separators.join("") + "])+"));

    for(let opr of pref){
        for(let i=0;i<splitexp.length;i++){
            if(splitexp[i]===opr){
                let num1=splitexp[i-1];
                let num2=splitexp[i+1];
                const ans=eval(num1,opr,num2);
                console.log(ans);
            }
        }
    }
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
