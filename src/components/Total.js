import '../css/Total.css';

export default function Total(props) {
    function checkDisplay() {
        if (props.favs.length != 0) {
            return <h2>Total: ${props.total.toFixed(2)}</h2>
        }
    }

    return (
        <div className="total">
            {checkDisplay()}
        </div>
    );
}