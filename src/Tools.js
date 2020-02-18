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
    if (histories && histories.length > 0) {
        const length = histories.length;
        const prevLength = 2;
        if (length < prevLength + 1) {
            return new RPS(RPSArray[Math.floor(Math.random() * 3)]);
        }
        var numAction = {};
        for (var i = 2; i < length; i++) {
            let prevAction = "";
            for (var j = 1; j <= prevLength; j++){
                prevAction = histories[i - j].player.getShortChoice() + histories[i - j].ai.getShortChoice() + prevAction;
            }
            const currAction = histories[i].player.getChoice(); // Fully written form (such as "Paper")
            if (numAction[prevAction] === undefined) {
                numAction[prevAction] = { "Rock": 0, "Paper": 0, "Scissors": 0 };
            }
            else {
                numAction[prevAction][currAction]++;
            }
        }
        let prevAction = "";
        for (var j = 1; j <= prevLength; j++){
            prevAction = histories[length - j].player.getShortChoice() + histories[i - j].ai.getShortChoice() + prevAction;
        }
        console.log(prevAction);
        if (numAction[prevAction] === undefined) {
            return new RPS(RPSArray[Math.floor(Math.random() * 3)]);
        }
        var predActionStr = "";
        var maxCount = -1;
        for (var choiceStr in numAction[prevAction]) {
            if (maxCount < numAction[prevAction][choiceStr]) {
                maxCount = numAction[prevAction][choiceStr];
                predActionStr = choiceStr;
            }
        }
        console.log(predActionStr);
        var predAction = new RPS(predActionStr);

        var chosenAction = predAction.getWinningRPS();
        return chosenAction;
    }
    else {
        return new RPS(RPSArray[Math.floor(Math.random() * 3)]);
    }
}