const RPSArray = ["Rock", "Paper", "Scissors"];

export class RPS {
    constructor(choice) {
        if (choice === "Rock" || choice === "R" || choice === 0) {
            this.choice = 0;
        } else if (choice === "Paper" || choice === "P" || choice === 1) {
            this.choice = 1;
        } else if (choice === "Scissors" || choice === "S" || choice === 2) {
            this.choice = 2;
        } else {
            console.log("Invalid value for making RPS object!");
            this.choice = null;
        }
    }

    getChoice() {
        try {
            return RPSArray[this.choice];
        } catch {
            return "Invalid!";
        }
    }

    getShortChoice() {
        try {
            return RPSArray[this.choice][0];
        } catch {
            return "I";
        }
    }

    getWinningRPS() {
        try {
            return new RPS((this.choice + 1) % 3);
        } catch {
            return "Invalid!";
        }
    }

    static determineWinner(player1, player2) {
        if (player1.choice === player2.choice) {
            return "Draw";
        }
        else if (player1.choice === (player2.choice + 1) % 3) {
            return "Win";
        }
        else if ((player1.choice + 1) % 3 === player2.choice) {
            return "Lose";
        }
        else {
            return "Invalid";
        }
    }

}

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
    return new RPS("Rock");
    if (histories && histories.length > 0) {
        const length = histories.length;
        if (length < 3) {
            return ["Rock", "Paper", "Scissors"][Math.floor(Math.random() * 3)];
        }
        var numAction = {};
        for (var i = 2; i < length; i++) {
            const prevAction = histories[i - 2].player[0] + histories[i - 2].ai[0] + histories[i - 1].player[0] + histories[i - 1].ai[0]; // Abbreviated form (such as "RRPS")
            const currAction = histories[i].player; // Fully written form (such as "Paper")
            if (numAction[prevAction] === null) {
                numAction[prevAction] = { "Rock": 0, "Paper": 0, "Scissors": 0 };
            }
            else {
                numAction[prevAction][currAction]++;
            }
        }
        const prevAction = histories[length - 2].player[0] + histories[length - 2].ai[0] + histories[length - 1].player[0] + histories[length - 1].ai[0];
        if (numAction[prevAction] === null) {
            return ["Rock", "Paper", "Scissors"][Math.floor(Math.random() * 3)];
        }
        var predAction = "";
        var maxCount = -1;
        for (var choice in numAction[prevAction]) {
            if (maxCount < numAction[prevAction][choice]) {
                maxCount = numAction[prevAction][choice];
                predAction = choice;
            }
        }
        var chosenAction = "";
        return predAction;
    }
    else {
        return ["Rock", "Paper", "Scissors"][Math.floor(Math.random() * 3)];
    }
}