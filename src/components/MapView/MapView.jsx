import { useHistory } from 'react-router-dom';

function MapView() {

    // use history for user navigation
    const history = useHistory();
    
    return (
        <>
        <button onClick={event => history.goBack()}>Go Back</button>
        </>
    );
}

export default MapView;