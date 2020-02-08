export function determineWinner(player1, player2) {
    if (player1 === "Rock") {
      if (player2 === "Scissors") return "Win";
      else if (player2 === "Paper") return "Lose";
      else if (player2 === "Rock") return "Draw";
      else return "Invalid";
    }
    else if (player1 === "Paper") {
      if (player2 === "Rock") return "Win";
      else if (player2 === "Scissors") return "Lose";
      else if (player2 === "Paper") return "Draw";
      else return "Invalid";
    }
    else if (player1 === "Scissors") {
      if (player2 === "Paper") return "Win";
      else if (player2 === "Rock") return "Lose";
      else if (player2 === "Scissors") return "Draw";
      else return "Invalid";
    }
    else {
      return "Invalid";
    }
}

export function chooseAIChoice(histories) {
  if (histories && histories.length > 0) {
    const length = histories.length;
    return histories[length - 1].player;
  }
  else {
    return ["Rock", "Paper", "Scissors"][Math.floor(Math.random() * 3)];
  }
}