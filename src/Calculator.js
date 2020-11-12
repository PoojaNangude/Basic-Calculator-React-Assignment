import React, {useState,useEffect} from 'react';

const Calculator = () => {

const [firstNum,setFirstNum]=useState(0);
const [secondNum,setSecondNum]=useState(0);
const [choice,setChoice]=useState('');
const [ans,setAns]=useState(0);
const [operator,setOperator]=useState('');

useEffect(() => {
    console.log("in use effect");
    <h6>{firstNum} {operator} {secondNum} {ans}</h6>
},[firstNum,secondNum,choice]);

const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(firstNum,secondNum,choice);

    switch(choice){
        case 'add':
            setOperator("+");
            setAns(parseFloat(firstNum)+parseFloat(secondNum));
            console.log(ans);
            break;

        case 'subtract':
            setOperator("-");
            setAns(parseFloat(firstNum)-parseFloat(secondNum));
            console.log(ans);
            break;
        
        case 'product':
            setOperator("*")
            setAns(parseFloat(firstNum)*parseFloat(secondNum));
            console.log(ans);
            break;

        case 'divide':
            setOperator("/");
            setAns(parseFloat(firstNum)/parseFloat(secondNum));
            console.log(ans);
            break;
    }

}


    return <React.Fragment>
        <div>
            <h1>Basic Calculator</h1>
            <form onSubmit={handleSubmit}>

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
                    <input type="radio" value="add" name="choice" />Add
                    <input type="radio" value="subtract" name="choice" />Subtract
                    <input type="radio" value="product" name="choice" />Product
                    <input type="radio" value="divide" name="choice" />Divide
                </div>
                <br></br>

                <button type="submit">Submit</button>

                <h3>ANS: {ans}</h3>
                
            </form>
        </div>
    </React.Fragment>;
}

export default Calculator;
