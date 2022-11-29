import FavoritesList from './FavoritesList';
import Total from './Total';

import '../css/Aggregator.css';

export default function Aggregator(props) {
    return (
        <div className="fav-box">
            <div className="fav-heading">
                <h2>Favorites</h2>
            </div>
            
            <FavoritesList favList={props.favs}/>
            <br/>
            <Total favs={props.favs} total={props.total}/>

        </div>
    );
}