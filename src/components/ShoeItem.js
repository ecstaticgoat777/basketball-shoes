import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import '../css/ShoeItem.css';


export default function ShoeItem(props) {
    const [buttonText, setButtonText] = useState('Add To Favorites');
    const [isFav, setFav] = useState(props.favState);

    useEffect(() => {
        const maintainFavState = () => {
            setFav(props.favState)
            props.favState ? setButtonText("Remove From Favorites") : setButtonText("Add To Favorites")
        }
        maintainFavState();
      }, [props.favState, props.items]);
    
    
    const changeText = () => {
        if (buttonText === "Add To Favorites") {
            setButtonText("Remove From Favorites") 
            setFav(true);
        } else {
            setButtonText("Add To Favorites")
            setFav(false);
        }
        props.handleFavs({key: props.shoe.name, name: props.shoe.name, price: props.shoe.price});
    }

    return (
        <div className="shoe-item">
            <Card className="shoe-card" style={{backgroundColor: isFav ? '#FFEDC4': '#E3F6FB'}}>
                <Card.Img className="Img" src={props.shoe.image}/>
                <Card.Body className="shoe-card-body">
                    <Card.Title className="shoe-card-title">{props.shoe.name}</Card.Title>
                    <Card.Text className="shoe-card-text">{props.shoe.brand}</Card.Text>
                    <Card.Text className="shoe-card-text">{props.shoe.sport}</Card.Text>
                    <Card.Text className="shoe-card-text">{props.shoe.gender}</Card.Text>
                    <Card.Text className="shoe-card-text">RATING: {props.shoe.rating}</Card.Text>
                    <Card.Text className="shoe-card-text">${props.shoe.price.toFixed(2)}</Card.Text>
                    <button className="fav-button" onClick={changeText} style={{backgroundColor: isFav ? '#FCB209': '#073F4E'}}>{buttonText}</button>
                </Card.Body>
            </Card>
        </div>
    )

}