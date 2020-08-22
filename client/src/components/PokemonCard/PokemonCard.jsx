import React, {useEffect, useState,useRef} from 'react';
import Move from '../Move/Move';
import './style.css';
import CanvasDraw from 'react-canvas-draw';

const PokemonCard = (props) => {

    const[loaded, setLoaded] = useState(false);
    const loadableCanvas = useRef();

    /* Color object to display different colors for each type */
    const colors = {
        Normal: "#555555",
        Fire: "#ff00ff",
        Water: "#0000ff",
        Grass: "#00ff00",
        Electric: "#ffff00",
        Psychic: "#ff00ff",
        Ice: "#99ccff",
        Dragon: "#ff9933",
        Dark: "#cc0099",
        Fairy: "#ff99cc",
        Fighting: "#cc3300",
        Flying: "#66ccff",
        Posion: "#cc99ff",
        Ground: "#cc7400",
        Rock: "666699",
        Bug: "#339933",
        Ghost: "#cccccc",
        Steel: "#999999"
    };

    /* Changes font color based on the pokemon type */
    const getStyle = (type) => {
        if(type == null){return {};}
        return {color: colors[type]};
    }

    /* Capitalizes the first letter of the type, might remove later */
    const capitalize = (str) => {
        if(str === ""){return "";}
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /* Displays all moves by the pokemon */
    let pokemonMoves = props.moves.map((move) => {
        return <Move name={move.name} type={capitalize(move.type)} power={move.power} />
    })

    /* Indicate that the current pokemon doesn't have a move */
    const noMoves = () => {
        return <tr>This Pokemon has no moves :(</tr>;
    }

    /* Displays pokemonMoves or noMoves, depending on whether the pokemon's moves are empty */
    let movesSection = () => {
        return props.moves.length === 0 ? noMoves() : pokemonMoves;
    }

    useEffect(() => {
        if(loadableCanvas.current == null){return;}
        loadableCanvas.current.loadSaveData(props.image);
        console.log(loadableCanvas.current.width);
    },[props.image]);

    return (
        <div className="pokemon-card-container">
            <div className="pokemon-card-container-inner">
                <CanvasDraw className="pokemon-photo"
                 disabled
                 hideGrid
                 ref={loadableCanvas}
                 saveData={props.image}
                 canvasWidth="45vh"
                 canvasHeight="45vh"
                />
                <div>
                    <p className="pokemoncard-name"> {props.name}</p>
                    <p className="pokemon-description">{props.description}</p>
                    <p className="pokemon-types">
                        <span className="pokemon-type-1" style={getStyle(capitalize(props.type1))}>{capitalize(props.type1)}</span> {'\u00A0'}
                        <span className="pokemon-type-2" style={getStyle(capitalize(props.type2))}>{capitalize(props.type2)}</span>
                    </p>
                    <p className="pokemoncard-bold">Moves: </p>
                    <table className="moves-table">
                        {movesSection()}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PokemonCard;