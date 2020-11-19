// import { render } from '@testing-library/react';
import React, {useState,useEffect} from 'react';
// In guiadvbrac2 branch
// Can handle brackets
const Calculator = () => {

    const [expression,setExpression]=useState('');
    //const [pstfix,setPstfix]=useState('');
    const [ans,setAns]=useState(0);
    const [prev,setPrev]=useState([]);
    const [ansArray,setAnsArray]=useState([]);
    let exp=0;

    //function for evaluation according to the operator
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

            default:
                break;
        }
        return(parseFloat(exp));
    }

    //function to return precedence of operator
    const precendence = (x) =>{
        if(x==='+'||x==='-'){
            return(1);
        }
        else
        if(x==='*'||x==='/'){
            return(2);
        }
        else{
            return(-1);
        }
    }

    //function to convert infix expression to postfix expression
    const infixToPostfix = (exp) =>{

        let separators=['+','-','*','/','(',')',' '];
        let expsplit=[];
        let prev_ind=0;
        for(let i=0;i<exp.length;i++){
            if(separators.includes(exp[i])){
                expsplit.push(exp.slice(prev_ind,i));
                expsplit.push(exp[i]);
                prev_ind=i+1;
            }
            else{
                continue;
            }
        }

        let stack=[];
        let operators=['+','-','/','*'];
        let output='';

        for(let chr of expsplit){
            if(!isNaN(chr)){output=output+chr+' ';}

            else
            if(chr==='('){stack.push(chr);}

            else
            if(chr===')'){
                while(stack[stack.length-1] !== '('){
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
            // else{stack.push(chr);} 
        }

        if((stack.length-1)!==-1){
            while((stack.length-1)!==-1){
                output=output+stack.pop()+' ';
            }
        }
        return(output);
        }

    // function to evaluate the value of the postfix expression
    const evaluate_postfix = (expr) =>{
        let post_stack=[];
        for(let term of expr){
            if(!isNaN(term)){
                post_stack.push(term);
            }
            else{
                let number2=post_stack.pop();
                let number1=post_stack.pop();
                let answer=evaluate(number1,term,number2);
                post_stack.push(answer);
            }
        }
        return(post_stack.pop());
    }

    //On pressing submit button after entering mathematical expression the handleSubmit function just calls the function to convert infix to postfix ans then the function to evaluate the postfix function
    const handleSubmit = (e) =>{
        e.preventDefault();
        let postfix=infixToPostfix(expression+' ');
        console.log(postfix);
        let post=postfix.split(' ');
        post=post.filter(function(x){
            return(x!=="");
        });
        let evaluated=evaluate_postfix(post);
        console.log(evaluated);
        setAns(evaluated);

        setAnsArray(ansArray.concat(evaluated));
        console.log("Ans array",ansArray);
    }

    const setInputArea = (record) => {
        console.log(record.id+' '+record.expression+' '+record.ans);
        setExpression(record.expression);
        setAns(0);

    }

    const clearCalculator = () =>{
        setExpression('');
        setAns(0);
    }

    useEffect(()=>{
        console.log('in useEffect');
        const record={id:new Date().getTime().toString(), expression,ans};
        console.log(record);
        setPrev(()=>{
            return [...prev,record];
    });
    },[ansArray]);

    useEffect(()=>{
        console.log('In useEffect');
    },[prev]);

        return (
            <div>
                <h1>Advanced Calculator</h1>
                <form>

                    <div>
                        <label htmlFor="expression">Enter mathematical expression : </label>
                    </div>
                    <br></br>
                    <div>
                        <textarea
                        rows="5"
                        cols="30"
                        id="expression"
                        name="expression"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        />
                    </div>
                    <br></br>

                    <button type="submit" onClick={handleSubmit}>Submit</button>
                    <button type="button" onClick={()=>clearCalculator()}>Clear</button>

                    <h3>ANS: {ans}</h3>
                </form>
                <br></br>
                <h3>History</h3>
                <div className="myBox">
                {
                    prev.slice(0).reverse().map((record,index)=>{
                        const {id,expression,ans}=record;
                        return(
                            <div key={id}>
                                <h5 onClick={()=>setInputArea(record)}> {expression} = {ans}
                                </h5> 
                            </div> 
                        );
                    })}
                </div>
            </div>
        );
}

export default Calculator;

//(24.3+23.23)/(5*3)+10/2*52-45
//218.1686666666667

//(24.3+(86.9*23.23/2))/(5*3)+10/2*52-45
//283.9095666666667