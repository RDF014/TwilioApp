const https = require('https');

class Trivia {
  constructor () {
    this.state = {};
    [
      'start',
      'fetchQuestion',
      'decodeBase64',
      'decodeTriviaObj',
      'addToState',
      'getQuestion',
      'getAnswer'
    ].forEach(method => this[method] = this[method].bind(this));
  }

  getAnswer () {
    return this.state.correct_answer;
  }

  getQuestion () {
    return new Promise((resolve) => {
      resolve(this.state);
    });
  }

  start () {
    return new Promise((resolve, reject) => {
      this.fetchQuestion()
      .then(obj => this.decodeTriviaObj(obj))
      .then(decodedObj => this.addToState(decodedObj))
      .then(() => resolve())
      .catch(err => reject(err));
    });
  }

  fetchQuestion () {
    return new Promise((resolve, reject) => {
      https.get('https://opentdb.com/api.php?amount=1&encode=base64', (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const triviaRes = JSON.parse(data);
          const triviaArray = triviaRes.results;
          const triviaObj = triviaArray[0];
          resolve(triviaObj);
        });
      })
      .on('error', (err) => reject(err));
    });
  }

  decodeTriviaObj ({ category, type, difficulty, question, correct_answer, incorrect_answers }) {
    return new Promise((resolve, reject) => {
      try {
        const decodedObj = {
          category: this.decodeBase64(category),
          type: this.decodeBase64(type),
          difficulty: this.decodeBase64(difficulty),
          question: this.decodeBase64(question),
          correct_answer: this.decodeBase64(correct_answer),
          incorrect_answers: incorrect_answers.map(answer => this.decodeBase64(answer))
        };
        resolve(decodedObj);
      } catch (err) {
        reject(err);
      }
    });
  }

  decodeBase64 (code) {
    const buff = Buffer.from(code, 'base64');
    return buff.toString('ascii');
  }

  addToState (decodedObj) {
    return new Promise((resolve, reject) => {
      try {
        this.state = Object.assign({}, decodedObj);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Trivia;
