import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

/*
 * reducer定義
 */
const initialAppState = {
  resultValue: 0,  // 結果 兼 左辺
  inputValue: 0,
  showingResult: false,
  culcResult: (state) => state.inputValue,
  seqOpe: false,   // 演算キー連続入力
  afterResult: false,
};

const appReducer = (state = initialAppState, action) => {
  const ope = (state, func) => {
    return {
      ...state,
      resultValue: state.seqOpe ? state.resultValue : state.culcResult(state),
      inputValue: 0,
      showingResult: true,
      culcResult: func,
      seqOpe: true,
      afterResult: false,
    };
  };

  if (action.type === 'INPUT_NUMBER') {
    return {
      ...state,
      inputValue: state.afterResult ? action.number : state.inputValue * 10 + action.number,
      showingResult: false,
      seqOpe: false,
      afterResult: false,
    };
  } else if (action.type === 'PLUS') {
    return ope(state, (state) => state.resultValue + state.inputValue);
  } else if (action.type === 'MINUS') {
    return ope(state, (state) => state.resultValue - state.inputValue);
  } else if (action.type === 'MULTI') {
    return ope(state, (state) => state.resultValue * state.inputValue);
  } else if (action.type === 'DIV') {
    return ope(state, (state) => 1.0 * state.resultValue / state.inputValue);
  } else if (action.type === 'RESULT') {
    return {
      ...state,
      resultValue: state.culcResult(state),
      inputValue: state.culcResult(state),
      showingResult: true,
      culcResult: (state) => state.inputValue,
      seqOpe: false,
      afterResult: true,
    };
  } else if (action.type === 'CLEAR') {
    return {
      ...state,
      resultValue: 0,
      inputValue: 0,
      showingResult: true,
      culcResult: (state) => state.inputValue,
      seqOpe: false,
      afterResult: false,
    };
  } else {
    return state;
  }
};

/*
 * component定義
 */
const NumBtn = ({ n, onClick }) => (
  <button onClick={onClick}>{n}</button>
);

const OpeBtn = ({ c, onClick }) => (
  <button onClick={onClick}>{c}</button>
);

const Result = ({ result }) => (
  <div>
   <span>{result}</span>
  </div>
);

const App = ({ store }) => {
  const state = store.getState();
  const result = state.showingResult ? state.resultValue : state.inputValue;
  const onNumClick = (number) => () => store.dispatch({ type: 'INPUT_NUMBER', number });
  return (
    <div>
      <Result result={result}/>
      <div>
        {[1, 2, 3].map((n) => <NumBtn n={n} key={n} onClick={onNumClick(n)} />)}
        <OpeBtn c={'+'} onClick={() => store.dispatch({ type: 'PLUS' })} />
      </div>
      <div>
        {[4, 5, 6].map((n) => <NumBtn n={n} key={n} onClick={onNumClick(n)} />)}
        <OpeBtn c={'-'} onClick={() => store.dispatch({ type: 'MINUS' })} />
      </div>
      <div>
        {[7, 8, 9].map((n) => <NumBtn n={n} key={n} onClick={onNumClick(n)} />)}
        <OpeBtn c={'*'} onClick={() => store.dispatch({ type: 'MULTI' })} />
      </div>
      <div>
        <NumBtn n={0} onClick={onNumClick(0)} />
        <OpeBtn c={'C'} onClick={() => store.dispatch({ type: 'CLEAR' })} />
        <OpeBtn c={'='} onClick={() => store.dispatch({ type: 'RESULT' })} />
        <OpeBtn c={'/'} onClick={() => store.dispatch({ type: 'DIV' })} />
      </div>
    </div>
  );
};

/*
 * 初期処理
 */
const appStore = createStore(appReducer);
const render = () => ReactDOM.render(<App store={appStore} />, document.getElementById('app'));
render();
appStore.subscribe(render);

