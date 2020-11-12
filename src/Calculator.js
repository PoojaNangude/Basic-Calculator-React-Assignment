import React, {useState,useEffect} from 'react';

const Calculator = () => {

const [firstNum,setFirstNum]=useState(0);
const [secondNum,setSecondNum]=useState(0);
const [choice,setChoice]=useState('');
const [ans,setAns]=useState(0);
const [operator,setOperator]=useState('');
const [prev,setPrev]=useState([]);

// TODO should we use effect or not
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

    if(firstNum && secondNum && choice && ans && operator){
        const record={id: new Date().getTime().toString(),firstNum,operator,secondNum,ans};
        setPrev((prev) => {
            return [...prev,record];
        });
    }
    else{
        console.log('empty values');
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
            {
                prev.map((record,index)=>{
                    const {id,firstNum,operator,secondNum,ans}=record;
                    return (
                        <div key={id}>
                            <h4>{firstNum} {operator} {secondNum} = {ans}</h4>
                        </div>
                    );
                })}
        </div>
    </React.Fragment>;
}

export default Calculator;
