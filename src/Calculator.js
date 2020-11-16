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

            case '(':
                break;
        }
        return(parseFloat(exp));
    }

    const precendence = (x) =>{
        if(x==='('||x===')')
        return(0);
        else
        if(x==='+'||x==='-')
        return(1);
        else
        if(x==='*'||x==='/')
        return(2);
        else
        return(3);
    }

    const infixToPostfix = (exp) =>{

        let separators = ["+","-","/","*",")","("];
        let splitexp=exp.split(new RegExp("([" + separators.join("") + "])+"));
        console.log(splitexp);
        let stack=[];
        let operators=['+','-','/','*'];
        let output='';

        for(let chr of splitexp){
            if(!isNaN(chr)){output=output+chr+' ';}

            else
            if(chr==='('){stack.push(chr);}

            else
            if(chr===')'){
                while(stack[stack.length-1] !== '('){
                    // console.log(stack[stack.length-1]);
                    output=output+(stack[stack.length-1])+' ';
                    stack.pop();
                }
                stack.pop();
            }

            else
            if(operators.includes(chr)){
                if((precendence(chr)<=precendence(stack[stack.length-1])) && ((stack.length-1)!==-1)){
                    while((precendence(chr)<=precendence(stack[stack.length-1])) && ((stack.length-1)!==-1)){
                        output=output+(stack[stack.length-1])+' ';
                        stack.pop();
                    }
                    
                }
                stack.push(chr);
            }

            else{stack.push(chr);} 
        }

        if((stack.length-1)!==-1){
            while((stack.length-1)!==-1){
                output=output+stack.pop()+' ';
            }
        }
        return(output);
        }
    


    const handleSubmit = (e) =>{
        e.preventDefault();
        let postfix=infixToPostfix(expression);
        console.log('Postfix : ',postfix);
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
