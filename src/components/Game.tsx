import React from "react";
import styled from 'styled-components';

import Keyboard from "./Keyboard";

/* Styles */
const DivWordle = styled.div`
    display: grid;
    place-items: center;
    width: 100%;
`;

const DivWordleGrid = styled.div`
    display: grid;
    grid-template-rows: repeat(6, auto);
    grid-template-columns: repeat(5, auto);
`;

const DivWordleGridBox = styled.div`
    width: 60px;
    height: 60px;
    border: 2px solid #3a3a3c;
    margin: 4px;
    background: ${props => props.theme.background};
    color: #fff;
    text-transform: uppercase;
    display: grid;
    place-items: center;
    font-family: Arial, Arial, Helvetica, sans-serif;
    font-size: 2.4em;
    animation: ${props => props.theme.animation};
    animation-delay: ${props => props.theme.animationDelay};
`;

DivWordleGridBox.defaultProps = {
    theme: {
        background: "none",
        animation: "none",
        animationDelay: "0ms"
    }
}

/* Interface */
interface IProps {

}

interface IState {
    isGameLoaded: boolean;
    isGameEnd: boolean;
    dictionary: string[];
    secretWord: string;
    grid: any[];
    backgroundGrid: any[];
    animation: any[];
    animationDelay: any[];
    currentRow: number;
    currentCol: number;
}

/* Main */
class Game extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            isGameLoaded: false,
            isGameEnd: false,
            dictionary: [
                "carpe", "bacon", "tosta", "diewo", "ramuw", "natuw", "atsel", "yamil",
                "supor", "wazap", "rocio", "kekon", "belen", "bruno", "klawz", "martu",
                "chifa"
            ],
            secretWord: "",
            grid: Array(6).fill("").map(() => Array(5).fill("")),
            backgroundGrid: Array(6).fill("").map(() => Array(5).fill("")),
            animation: Array(6).fill("").map(() => Array(5).fill("")),
            animationDelay: Array(6).fill("").map(() => Array(5).fill("")),
            currentRow: 0,
            currentCol: 0
        }
    }

    alerts() {
        return <></>
    }

    drawGrid() {
        let box = [];
        let theme = {};

        for(let i = 0; i < 6; ++i) {
            for(let j = 0; j < 5; ++j) {
                theme = {
                    background: this.state.backgroundGrid[i][j],
                    animation: this.state.animation[i][j],
                    animationDelay: this.state.animationDelay[i][j]
                };

                box.push(<DivWordleGridBox key={`${i}${j}`} theme={theme}>{this.state.grid[i][j]}</DivWordleGridBox>);
            }
        }

        return box;
    }

    registerKeyboardEvents() {
        document.body.onkeydown = (event) => {
            const key = event.key;

            if(key === "Enter") {
                if(this.state.isGameEnd === false) {
                    if(this.state.currentCol === 5) {
                        this.checkWord();
                    } else {
                        alert("Completa la palabra");
                    }
                }
            }

            if(key === "Backspace") {
                if(this.state.isGameEnd === false) {
                    this.removeLetter();
                }
            }

            if(!(event.ctrlKey || event.shiftKey) && this.isLetter(key)) {
                if(this.state.isGameEnd === false) {
                    this.addLetter(key);
                }
            }
        };
    }

    checkWord() {
        const word = this.getCurrentWord();

        if(!this.isWordValid(word)) {
            alert("La palabra ingresada no existe en el diccionario.");
            return;
        }

        this.revealWord(word);

        this.setState({currentRow: (this.state.currentRow + 1)});
        this.setState({currentCol: 0});
    }

    getCurrentWord() {
        return this.state.grid[this.state.currentRow].reduce((previous: number, current: number) => (previous + current));
    }

    isWordValid(word: string) {
        return this.state.dictionary.includes(word);
    }

    revealWord(guess: string) {
        const row = this.state.currentRow;
        const animation_duration = 500;

        for(let i = 0; i < 5; ++i) {
            const letter = this.state.grid[row][i];
            const backgroundGrid = [...this.state.backgroundGrid];
            const animation = [...this.state.animation];
            const animationDelay = [...this.state.animationDelay];

            setTimeout(() => {
                if(letter === this.state.secretWord[i]) {
                    backgroundGrid[row][i] = "#538d4e";
                    this.setState({backgroundGrid: backgroundGrid});
                } else if(this.state.secretWord.includes(letter)) {
                    backgroundGrid[row][i] = "#b59f3b";
                    this.setState({backgroundGrid: backgroundGrid});
                } else {
                    backgroundGrid[row][i] = "#3a3a3c";
                    this.setState({backgroundGrid: backgroundGrid});
                }
            }, (((i + 1) * animation_duration) / 2));

            animation[row][i] = "flip 0.5s ease";
            animationDelay[row][i] = "" + ((i * animation_duration) / 2) + "ms";

            this.setState({animation: animation});
            this.setState({animationDelay: animationDelay});
        }

        const isWinner = (this.state.secretWord === guess);
        const isGameOver = (this.state.currentRow === 5);
 
        setTimeout(() => {
            if(isWinner || isGameOver) {
                if(isWinner) {
                    alert("Adivinaste al boneco.");
                } else if(isGameOver) {
                    alert("Mala suerte. El nombre del boneco era: " + this.state.secretWord);
                }
                
                this.setState({isGameEnd: true});
            }
        }, (3 * animation_duration));
    }

    removeLetter() {
        if(this.state.currentCol === 0) {
            return;
        }

        let grid = [...this.state.grid];
        
        grid[this.state.currentRow][(this.state.currentCol - 1)] = "";

        this.setState({currentCol: (this.state.currentCol - 1)});
        this.setState({grid: grid});
    }

    isLetter(key: string) {
        return (key.length === 1 && key.match(/[a-z]/i));
    }

    addLetter(key: string) {
        if(this.state.currentCol === 5) {
            return;
        }

        let grid = [...this.state.grid];
        
        grid[this.state.currentRow][this.state.currentCol] = key.toLocaleLowerCase();
        
        this.setState({currentCol: (this.state.currentCol + 1)});
        this.setState({grid: grid});
    }

    addLetterFromKeyboard = (event: any) => {
        if(event.target.innerHTML === "ENTER") {
            if(this.state.isGameEnd === false) {
                if(this.state.currentCol === 5) {
                    this.checkWord();
                } else {
                    alert("Completa la palabra");
                }
            }
        }

        if(event.target.innerHTML === "DEL") {
            if(this.state.isGameEnd === false) {
                this.removeLetter();
            }
        }

        if(this.isLetter(event.target.innerHTML)) {
            if(this.state.isGameEnd === false) {
                this.addLetter(event.target.innerHTML);
            }
        }
    }

    componentDidMount() {
        this.registerKeyboardEvents();

        this.setState({secretWord: this.state.dictionary[Math.floor(Math.random() * this.state.dictionary.length)]});
        this.setState({isGameLoaded: true});
        this.setState({isGameEnd: false});
    }

    render() {
        return (
            <>
                <div className="pb-3">
                    {this.alerts()}
                </div>
                <div className="pb-3">
                    <DivWordle>
                        <DivWordleGrid>
                            {this.drawGrid()}
                        </DivWordleGrid>
                    </DivWordle>
                </div>
                <div className="pb-3">
                    <Keyboard letter={this.addLetterFromKeyboard} />
                </div>
            </>
        );
    }
}

export default Game;
