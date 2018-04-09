import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state = {
		playerOneTurn: true,
		turn: 1,
		game: 1,
		reveal: false,
		winner: '',
		x: 0,
		o: 0,
		tie: 0,
	};

	takeMove = event => {
		const target = event.target;
		if (target.classList[0] === 'App__Square') {
			target.firstChild.classList.add(
				this.state.playerOneTurn ? 'displayO' : 'displayX'
			);
			if (this.checkWinner()) this.gameOver();
			else {
				const turnUp = this.state.turn + 1;
				if (turnUp > 9) this.gameTied();
				this.setState({ playerOneTurn: !this.state.playerOneTurn });
				this.setState({ turn: turnUp });
			}
		}
	};

	checkWinner = () => {
		const squares = document.querySelectorAll('.App__Square--display');
		if (this.checkDiags(squares)) return true;
		if (this.checkRows(squares)) return true;
		if (this.checkColumns(squares)) return true;
	};

	checkDiags = squares => {
		if (squares[0].classList[1]) {
			if (
				squares[0].classList[1] === squares[4].classList[1] &&
				squares[0].classList[1] === squares[8].classList[1]
			)
				return true;
		}
		if (squares[2].classList[1]) {
			if (
				squares[2].classList[1] === squares[4].classList[1] &&
				squares[2].classList[1] === squares[6].classList[1]
			)
				return true;
		}
		return false;
	};

	checkRows = squares => {
		if (squares[0].classList[1]) {
			if (
				squares[0].classList[1] === squares[1].classList[1] &&
				squares[0].classList[1] === squares[2].classList[1]
			)
				return true;
		}
		if (squares[3].classList[1]) {
			if (
				squares[3].classList[1] === squares[4].classList[1] &&
				squares[3].classList[1] === squares[5].classList[1]
			)
				return true;
		}
		if (squares[6].classList[1]) {
			if (
				squares[6].classList[1] === squares[7].classList[1] &&
				squares[6].classList[1] === squares[8].classList[1]
			)
				return true;
		}
		return false;
	};

	checkColumns = squares => {
		if (squares[0].classList[1]) {
			if (
				squares[0].classList[1] === squares[3].classList[1] &&
				squares[0].classList[1] === squares[6].classList[1]
			)
				return true;
		}
		if (squares[1].classList[1]) {
			if (
				squares[1].classList[1] === squares[4].classList[1] &&
				squares[1].classList[1] === squares[7].classList[1]
			)
				return true;
		}
		if (squares[2].classList[1]) {
			if (
				squares[2].classList[1] === squares[5].classList[1] &&
				squares[2].classList[1] === squares[8].classList[1]
			)
				return true;
		}
		return false;
	};

	gameOver = () => {
		const squares = document.querySelectorAll('.App__Square--display');
		squares.forEach(square => {
			if (!square.classList[1]) square.classList.add('displayNone');
		});
		const winner = this.state.playerOneTurn ? "O's win!" : "X's win!";
		this.setState({ reveal: true, winner: winner });
	};

	gameTied = () => {
		const squares = document.querySelectorAll('.App__Square--display');
		squares.forEach(square => {
			if (!square.classList[1]) square.classList.add('displayNone');
		});
		this.setState({ reveal: true, winner: 'You Tie!' });
	};

	newGame = () => {
		switch (this.state.winner) {
			case "O's win!":
				this.setState({ o: this.state.o + 1 });
				break;
			case "X's win!":
				this.setState({ x: this.state.x + 1 });
				break;
			case 'You Tie!':
				this.setState({ tie: this.state.tie + 1 });
				break;
			default:
				console.log('error');
		}
		const squares = document.querySelectorAll('.App__Square--display');
		squares.forEach(square => {
			square.classList.remove('displayNone', 'displayO', 'displayX');
		});
		this.setState({
			turn: 1,
			game: this.state.game + 1,
			reveal: false,
			winner: '',
		});
	};

	render() {
		return (
			<div className="App__Container">
				{this.state.reveal ? (
					<div>
						<div className="App__replayWinner">{this.state.winner}</div>
						<button className="App__replayButton" onClick={this.newGame}>
							Play Again
						</button>
					</div>
				) : null}
				<div className="App__Scoreboard">
					<h4>Game: {this.state.game}</h4>
					<div>X's: {this.state.x}</div>
					<div>O's: {this.state.o}</div>
					<div>Ties: {this.state.tie}</div>
					<div>Turn: {this.state.turn}</div>
				</div>
				<div className="App__Board">
					<div onClick={this.takeMove} className="App__Square">
						<div id="1" className="App__Square--display" />
					</div>
					<div onClick={this.takeMove} className="App__Square">
						<div id="2" className="App__Square--display" />
					</div>
					<div onClick={this.takeMove} className="App__Square">
						<div id="3" className="App__Square--display" />
					</div>
					<div onClick={this.takeMove} className="App__Square">
						<div id="4" className="App__Square--display" />
					</div>
					<div onClick={this.takeMove} className="App__Square">
						<div id="5" className="App__Square--display" />
					</div>
					<div onClick={this.takeMove} className="App__Square">
						<div id="6" className="App__Square--display" />
					</div>
					<div onClick={this.takeMove} className="App__Square">
						<div id="7" className="App__Square--display" />
					</div>
					<div onClick={this.takeMove} className="App__Square">
						<div id="8" className="App__Square--display" />
					</div>
					<div onClick={this.takeMove} className="App__Square">
						<div id="9" className="App__Square--display" />
					</div>
				</div>
			</div>
		);
	}
}

export default App;
