import React from 'react';
import './Aside.css';
import {determineWinner} from './Tools';

class History extends React.Component {
  constructor(props) {
    super(props);
    this.temp = {temp: "temp"};
  }

  render() {
    const playerChoice = this.props.player;
    const aiChoice = this.props.ai;

    const playerBlock = "historyBlock " + determineWinner(playerChoice, aiChoice);
    const aiBlock = "historyBlock " + determineWinner(aiChoice, playerChoice); 

    return (  
      <div className="historyBlockRow">
        <span className={playerBlock}>{playerChoice}</span>
        <span className={aiBlock}>{aiChoice}</span>
      </div>
    );
  }
}

class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate(Aside)");
    if (this.props.histories !== prevProps.histories) {
      this.myRef.current.scrollTop = this.myRef.current.scrollHeight;
    }
  }

  render() {
    // const playerScore = this.state.score.player;
    // const aiScore = this.state.score.ai;
    const playerScore = this.props.histories.filter((history) => 
      determineWinner(history.player, history.ai) === "Win"
    ).length;
    const aiScore = this.props.histories.filter((history) => 
      determineWinner(history.ai, history.player) === "Win"
    ).length;
    const historiesComponent = this.props.histories.map((history, index) =>
      <History key={index} player={history.player} ai={history.ai} />
    );

    return (
      <React.Fragment>
        <div className="historyDisplay">
          <header className="historyHeader">Logs</header>
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