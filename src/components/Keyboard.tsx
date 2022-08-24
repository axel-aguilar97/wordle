import React from 'react';
import styled from 'styled-components'

/* Global */
const keys = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ",
    "ENTER", "Z", "X", "C", "V", "B", "N", "M", "DEL"
];

/* Styles */
const DivContainer = styled.div`
    width: 550px;
    margin-left: auto;
    margin-right: auto;
`;

const DivKeyboard = styled.div`
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-template-columns: repeat(10, auto);
`;

const ButtonKey = styled.button`
    width: 48px;
    height: 64px;
    margin-bottom: 5px;
    display: grid;
    place-items: center;
    border: none;
    font-family: Arial, Arial, Helvetica, sans-serif;
    text-transform: uppercase;
`;

/* Interface */
interface IProps {
    letter: any;
}

interface IState {

}

/* Main */
export default class Keyboard extends React.Component<IProps, IState> {
    drawKeyboard() {
        let keyboard = [];

        for(let k = 0; k < keys.length; ++k) {
            keyboard.push(
                <ButtonKey id={k.toString()} key={k.toString()} onClick={this.props.letter} className="rounded fw-bold">
                    {keys[k]}
                </ButtonKey>
            )
        }

        return keyboard;
    }

    render() {
        return (
            <DivContainer className="cKeyboardOnDesktop">
                <DivKeyboard>
                    {this.drawKeyboard()}
                </DivKeyboard>
            </DivContainer>
        );
    }
}
