import React from 'react';
import './App.css';
import Aside from './Aside';
import Battle from './Battle';
import {chooseAIChoice, RPS} from './Tools';


class App extends React.Component {
  constructor(props) {
    super(props);
    const prevHistoryJSON = localStorage.getItem("previousHistory");
    const prevHistoryStr = JSON.parse(prevHistoryJSON) || [];
    const prevHistory = prevHistoryStr.map(history => ({player: new RPS(history.player), ai: new RPS(history.ai)}));
    this.state = {histories: prevHistory, //{player: "Rock", ai: "Scissors"}, {player: "Rock", ai: "Paper"}],
                  aiChoice: chooseAIChoice(prevHistory),
                  updateCount: 0};
    this.onSelect = this.onSelect.bind(this);
    this.onClose = this.onClose.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
  }

  clearHistory() {
    console.log("Clear! from App");
    const clearedHistories = [];
    this.setState({histories: clearedHistories});
    localStorage.setItem("previousHistory", JSON.stringify(clearedHistories));
  }
  
  onSelect(choice) {
    this.setState((state, props) => ({
      histories: state.histories.concat([{player: choice, ai: state.aiChoice}])
    }));
    setTimeout(() => this.setState((state, props) => ({
      aiChoice: chooseAIChoice(state.histories),
      updateCount: state.updateCount + 1
    })), 1000);
  }

  onClose() {
    console.log("onClose!");
    const histories = this.state.histories;
    const historiesStr = histories.map(history => ({player: history.player.getChoice(), ai: history.ai.getChoice()}));
    localStorage.setItem("previousHistory", JSON.stringify(historiesStr));
  }

  componentDidMount() {
    console.log("componentDidMount");
    window.addEventListener('beforeunload', this.onClose);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    window.removeEventListener('beforeunload', this.onClose);
  }

  render() {
    const histories = this.state.histories;
    const aiChoice = this.state.aiChoice;
    const updateCount = this.state.updateCount;
    return (
      <React.Fragment>
        <aside className="scoreSidebar">
          <Aside histories={histories} clearHistory={this.clearHistory} />
        </aside>
        <div className="mainApp" id="mainPage">
          <Battle aiChoice={aiChoice} onSelect={this.onSelect} updateCount={updateCount} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
