import React, { Component } from "react";
import _ from "lodash";

const createInitialState = () => ({
  result: 0,
  number: null,
  operation: null
});

const operateByOperation = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b
};

const getOperate = operation => operateByOperation[operation];

const NumberButton = ({ number, onNumberEntry }) => (
  <button
    onClick={() => {
      onNumberEntry(number);
    }}
  >
    {number}
  </button>
);

const NumberButtons = props => (
  <div>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
      <NumberButton key={number} number={number} {...props} />
    ))}
  </div>
);

const OperateButton = ({ operation, onOperationEntry }) => (
  <button
    onClick={() => {
      onOperationEntry(operation);
    }}
  >
    {operation}
  </button>
);

const OperateButtons = props => (
  <div>
    {["+", "-", "*", "/"].map(operation => (
      <OperateButton operation={operation} {...props} />
    ))}
  </div>
);

const EqualsButton = ({ onEqualsEntry }) => (
  <div>
    <button onClick={onEqualsEntry}>=</button>
  </div>
);

const ClearButton = ({ onClearEntry }) => (
  <div>
    <button onClick={onClearEntry}>C</button>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = createInitialState();
  }

  handleCompute() {
    const { operation, number, result } = this.state;
    const operate = getOperate(operation);
    this.setState({
      operation: null,
      number: null,
      result: operate(result, number)
    });
  }

  handleOperationEntry = operation => {
    this.setState({ operation });
  };

  handleNumberEntry = number => {
    if (_.isNil(this.state.operation)) {
      this.setState({ result: number });
    } else {
      this.setState({ number });
    }
  };

  handleEqualsEntry = () => {
    this.handleCompute();
  };

  handleClearEntry = () => {
    this.setState(createInitialState());
  };

  render() {
    const { result } = this.state;
    return (
      <div>
        <pre>{JSON.stringify(this.state, null, 4)}</pre>
        <p>RESULT: {result}</p>
        <NumberButtons onNumberEntry={this.handleNumberEntry} />
        <OperateButtons onOperationEntry={this.handleOperationEntry} />
        <EqualsButton onEqualsEntry={this.handleEqualsEntry} />
        <ClearButton onClearEntry={this.handleClearEntry} />
      </div>
    );
  }
}

export default App;
