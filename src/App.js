import { useReducer } from 'react';
import './App.css';
import DigitButton from './components/DigitButton';
import OperationButton from './components/OperationButton';


export const ACTIONS = {
  ADD_DIGIT: 'ADD_DIGIT',
  CHOOSE_OPERATION: 'CHOOSE_OPERATION',
  CLEAR: 'CLEAR',
  DELETE_DIGIT: 'DELETE_DIGIT',
  EVALUATE: 'EVALUATE',
}

function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) {
        return {
          ...state,
          currentOperant: payload.digit,
          overwrite: false
        }}
      if(payload.digit === "0" && state.currentOperant === "0") {
        return state
      }
      if(payload.digit === "." && state.currentOperant.includes(".")){
        return state
      }

      return {
        ...state,
        currentOperant: `${state.currentOperant || ""}${payload.digit}`,
      }
      case ACTIONS.CHOOSE_OPERATION:
        if(state.currentOperant == null && state.previousOperand == null) {
          return state
        }

        if(state.currentOperant == null) {
          return {
            ...state,
            operation: payload.operation,
          }
        }
        if( state.previousOperand == null ) {
          return {
            ...state,
            previousOperand: state.currentOperant,
            currentOperant: null,
            operation: payload.operation,
          }
        }

        return{
          state,
          previousOperand: evaluate(state),
          operation: payload.operation,
          currentOperant: null,
        }
      case ACTIONS.CLEAR:
        return {}

      case ACTIONS.EVALUATE:
        if(state.operation == null || state.currentOperant == null || state.previousOperand == null) {
          return state
        }

        return {
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperant: evaluate(state),
        }
      case ACTIONS.DELETE_DIGIT:
        if(state.overwrite) {
          return {
            ...state,
            overwrite: false,
            currentOperant: null,
          }
        }
        if(state.currentOperant == null) {
          return state
          }
        if (state.currentOperant.length === 1) {
          return { ...state, currentOperant: null }
        }

        return {
          ...state,
          currentOperant: state.currentOperant.slice(0, -1),
        }
      default:
        return state
  }

}

function evaluate ({currentOperant, previousOperand, operation}) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperant);
  if(isNaN(prev) || isNaN(current)) {
    return "";
  }
  let computation = "";
  switch(operation) {
    case "+":
      computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default: return "";
}
}

function App() {

  const [{currentOperant, previousOperand, operation}, dispatch] = useReducer(reducer,
     {}
    );

    
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operant">{currentOperant}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>÷</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button>
      {/* <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button> */}
    </div>
  )
};

export default App;
