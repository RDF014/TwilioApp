const Trivia = require('./trivia');

class Game {
  constructor () {
    this.message = '';
    this.answers = [];
    this.trivia = null;

    [
      'start',
      'formatQuestion',
      'shuffleAnswers',
      'getMessage',
      'checkAnswer',
      'invalidRes'
    ].forEach(method => this[method] = this[method].bind(this));
  }

  invalidRes () {
    return new Promise((resolve) => {
      resolve('Invalid input. Type "Start" to get the question then answer with the number');
    });
  }

  checkAnswer (idx) {
    return new Promise((resolve, reject) => {
      try {
        const answer = this.trivia.getAnswer();
        if ( this.answers[Number(idx) - 1] === answer ) {
          resolve('You got the answer right!');
        } else {
          resolve(`You got it wrong. The answer is: ${answer}`);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  start () {
    this.trivia = new Trivia();
    return this.trivia.start()
    .then(() => this.trivia.getQuestion())
    .then(obj => this.formatQuestion(obj))
    .then(string => this.getMessage());
  }

  getMessage () {
    return new Promise((resolve) => {
      resolve(this.message);
    });
  }

  formatQuestion ({ category, difficulty, question, correct_answer, incorrect_answers }) {
    return new Promise((resolve) => {
      const categoryString = `Category: ${category}\n`;
      const difficultyString = `Difficulty: ${difficulty}\n`;
      const questionString = `Question: ${question}\n`;
      this.answers = this.shuffleAnswers([...incorrect_answers, correct_answer]);
      const answerString = `Answers:\n${this.answers.reduce((str, ans, idx) => str + `${idx + 1}. ${ans}\n`, '')}`;
      this.message = categoryString + difficultyString + questionString + answerString;
      resolve(this.message);
    });
  }

  shuffleAnswers (array) {
    return array.sort((a, b) => 0.5 - Math.random());
  }
}

module.exports = Game;
