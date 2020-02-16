import React from 'react';
import './Aside.css';
import {determineWinner, RPS} from './Tools';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.temp = {temp: "temp"};
  }

  render() {
    const playerChoice = this.props.player;
    const aiChoice = this.props.ai;

    const playerBlock = "historyBlock " + RPS.determineWinner(playerChoice, aiChoice);
    const aiBlock = "historyBlock " + RPS.determineWinner(aiChoice, playerChoice); 

    return (  
      <div className="historyBlockRow">
        <span className={playerBlock}>{playerChoice.getChoice()}</span>
        <span className={aiBlock}>{aiChoice.getChoice()}</span>
      </div>
    );
  }
}

class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.clearHistory = this.clearHistory.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate(Aside)");
    if (this.props.histories !== prevProps.histories) {
      this.myRef.current.scrollTop = this.myRef.current.scrollHeight;
    }
  }

  clearHistory() {
    console.log("Clear!");
  }

  render() {
    // const playerScore = this.state.score.player;
    // const aiScore = this.state.score.ai;
    const playerScore = this.props.histories.filter((history) =>
      RPS.determineWinner(history.player, history.ai) === "Win"
      // determineWinner(history.player, history.ai) === "Win"
    ).length;
    const aiScore = this.props.histories.filter((history) => 
      RPS.determineWinner(history.ai, history.player) === "Win"
      // determineWinner(history.ai, history.player) === "Win"
    ).length;
    const historiesComponent = this.props.histories.map((history, index) =>
      <History key={index} player={history.player} ai={history.ai} />
    );

    return (
      <React.Fragment>
        <div className="historyDisplay">
          <header className="historyHeader">
            <div className="historyHeaderLeftSide"></div>
            <span className="historyHeaderText">Logs</span>
            <div className="historyHeaderRightSide">
              <img className="historyClearButtonImage" src="clear.png" alt="Clear" onClick={this.props.clearHistory} />
            </div>
          </header>
          <div className="historyList">
            <div className="historyListHeader">
              <span className="historyListHeaderPlayer">You</span>
              <span className="historyListHeaderSpliter">vs</span>
              <span className="historyListHeaderPlayer">AI</span>
            </div>
            <div className="historyListSeperateLine">
            </div>
            <div className="historyListContainer" ref={this.myRef}>
              {historiesComponent}
            </div>
          </div>
        </div>
        <footer className="scoreFooter">
          {playerScore} : {aiScore}
        </footer>
      </React.Fragment>
    );
  }
}

export default Aside;