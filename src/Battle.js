import React from 'react';
import './Battle.css';
import {determineWinner, RPS} from './Tools';

class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.handleChoice = this.handleChoice.bind(this);
  }

  handleChoice(e) {
    const imgText = this.props.name;
    console.log("From Choice: " + imgText);
    if (this.props.onSelect) {
      this.props.onSelect(imgText);
    }
  }

  render() {
    const imgText = this.props.name;
    const imgURL = this.props.name.toLowerCase() + ".png";

    return (
      <div className="choiceItem" onClick={this.handleChoice}>
        <img className="choiceImg" src={imgURL} alt={imgText} />
        <span className="choiceText">{imgText}</span>
      </div>
    );
  }
}

class ResultDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const appear = this.props.appear;
    const result = this.props.result;
    return (
      <div className="resultContainer">
        <span className="resultDisplay">{appear ? result : "Please Choose Your RPS"}</span>
      </div>
    );
  }
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.state = {appear: false};
  }

  onSelect(choiceStr) {
    console.log("From Battle: " + choiceStr);
    const choice = new RPS(choiceStr);
    this.setState((state, props) => ({
      appear: true,
      result: RPS.determineWinner(choice, props.aiChoice)
    }));
    this.props.onSelect(choice);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate(Battle)");
    if (this.props.updateCount !== prevProps.updateCount) {
      console.log("Reset battle");
      this.setState({appear: false, result: null});
    }
  }

  render() {
    const appear = this.state.appear;
    const aiChoice = this.props.aiChoice;
    const result = this.state.result;
    return (
      <React.Fragment>
        <div className="AIChoiceSection">
          <Choice name={appear ? aiChoice.getChoice() : "Unknown"} />
        </div>
        <div className="resultSection">
          <ResultDisplay appear={appear} result={result}/>
        </div>
        <div className="userChoiceSection">
          <Choice name="Rock" onSelect={appear ? null : this.onSelect} />
          <Choice name="Paper" onSelect={appear ? null : this.onSelect} />
          <Choice name="Scissors" onSelect={appear ? null : this.onSelect} />
        </div>
      </React.Fragment>
    );
  }
}

export default Battle;
