import React from 'react';
import img1 from '../../../Assets/Images/1.png';
import img2 from '../../../Assets/Images/2.png';
import img3 from '../../../Assets/Images/3.png';
import img4 from '../../../Assets/Images/4.png';

const Character = (props) => {
    let img = "";
    switch(props.image) {
        case "monkey":
            img = img1;
            break;
        case "elephant":
            img = img2;
            break
        case "rabbit":
            img = img3;
            break;
        case "cheetah":
            img = img4;
            break;
        default: 
            img = img1;
            break;
    }

    const currentlySelected = (props) => {
        if(props.currentlySelectedCharacter === props.image) {
            return "true";
        }
        else {
            return "false";
        }
    }

	return (
        <div className={"character-images selected-" + currentlySelected(props)}>
            <img src={img} alt={"character" + props.image} width="100px" onClick={() => props.characterClick(props.image)}></img>
            
        </div>
	);
}

export default Character;