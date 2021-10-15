import { useHistory } from 'react-router-dom';

function AddPhotos() {
    // use history for user navigation between pages
    const history = useHistory()

    return(
        <>
        <p>picture upload placeholder</p>
        <input type="text" placeholder="Common Name"></input> <br />
        <input type="text" placeholder="Scientific Name (optional)"></input><br />
        <input type="text" placeholder="Where"></input> <br />
        <input type="text" placeholder="When"></input> <br />
        <input type="text" placeholder="Additional Details"></input> <br />
        <button onClick={event => history.goBack()}>Go Back</button>
        <button>Add</button>
        </>
    );
}

export default AddPhotos;