import '../css/FavoritesList.css';


export default function FavoritesList(props) {
    const createEntry = (favObject) => {
        return (
            <li key={favObject.name} className="fav-entry">
                <div className="fav-text">{favObject.name}</div>
                <div className="fav-price">${favObject.price}</div>
            </li>
        )
    }
    return <ul>{props.favList.map(createEntry)}</ul>
}