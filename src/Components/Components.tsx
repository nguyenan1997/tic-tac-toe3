import React from "react";
import { useState } from "react";

function Square ({value, handleOnClick} : {value: any, handleOnClick : () => void}){
    return <button className="square" onClick={handleOnClick}>{value}</button>
}

function Board({squares, xIsNext, onPlay}: {squares: Array<any>, xIsNext: boolean, onPlay: (n: any) => void}) : JSX.Element{
    function handleClick(i: number){
        if(squares[i] || calculateWinner(squares)){
            return;
        }
        const copySquare = squares.slice();
        if(xIsNext){
            copySquare[i] = "X";
        }
        else{
            copySquare[i] = "O";
        }
        onPlay(copySquare)
    }
    
    const winner = calculateWinner(squares);
    let status;
    if(winner){
        status = "Winner : " + winner
    }
    else{
        status = "NextPlayer: " + (xIsNext ? "X" : "O")
    }
    return (
        <div>
            <h1>Game Tic-Tac-Toe Created By <span>React</span></h1>
            <h2>{status}</h2>
            <div className="rows">
                <Square value ={squares[0]} handleOnClick={() => handleClick(0)}/>
                <Square value={squares[1]} handleOnClick={() => handleClick(1)}/>
                <Square value={squares[2]} handleOnClick={() => handleClick(2)}/>
            </div>
            <div className="rows">
                <Square value={squares[3]} handleOnClick={() => handleClick(3)}/>
                <Square value={squares[4]} handleOnClick={() => handleClick(4)}/>
                <Square value={squares[5]} handleOnClick={() => handleClick(5)}/>
            </div>
            <div className="rows">
                <Square value={squares[6]} handleOnClick={() => handleClick(6)}/>
                <Square value={squares[7]} handleOnClick={() => handleClick(7)}/>
                <Square value={squares[8]} handleOnClick={() => handleClick(8)}/>
            </div>
        </div>
    )
}

function Game(){
    let [history, setHistory] = useState([Array(9).fill(null)]);
    let [xIsNext, setXIsNext] = useState(true);
    let [currentMove, setCurrentMove] = useState(0);
    const currentSquare = history[currentMove];

    function handlePlay(copySquare: Array<any>){
        const historyBoard = [...history.slice(0, currentMove + 1), copySquare]
        setHistory(historyBoard);
        setCurrentMove(historyBoard.length -1 );
        setXIsNext(!xIsNext)
    }

    function jumpTo(nextMove: any){
        setCurrentMove(nextMove);
        setXIsNext(nextMove % 2 === 0);
    }
    const moves = history.map((square, move) => {
        let description;
        if(move > 0){
            description = "Lượt thứ " + move
        }
        else{
            description = "Bắt đầu chơi"
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })
    return (
        <div className="container">
            <div className="game-info">
                <Board squares={currentSquare} xIsNext={xIsNext} onPlay={handlePlay}/>
            </div>
            <div className="status">
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    )
}

function calculateWinner(squares: Array<any>){
    let lists = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for(let i = 0; i< lists.length; i++){
        const [a,b,c] = lists[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a]
        }
    }
    return null
}

export default Game