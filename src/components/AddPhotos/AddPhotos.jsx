import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function AddPhotos() {
    // use history for user navigation between pages
    const history = useHistory()

    const [newMushroom, setNewMushroom] = useState({
        commonName: '',
        scientificName: '',
        location: '',
        date: '',
        details: '',
    })

        


    return(
        <>
        <p>picture upload placeholder</p>
        <input type="text" value={newMushroom.commonName} onChange={(event) => setNewMushroom({ ... newMushroom, commonName: event.target.value})} placeholder="Common Name"></input> <br />
        <input type="text" value={newMushroom.scientificName} onChange={(event) => setNewMushroom({ ... newMushroom, scientificName: event.target.value})} placeholder="Scientific Name (optional)"></input><br />
        <input type="text" value={newMushroom.location} onChange={(event) => setNewMushroom({ ... newMushroom, location: event.target.value})} placeholder="Where"></input> <br />
        <input type="text" value={newMushroom.date} onChange={(event) => setNewMushroom({ ... newMushroom, date: event.target.value})} placeholder="When"></input> <br />
        <input type="text" value={newMushroom.details} onChange={(event) => setNewMushroom({ ... newMushroom, details: event.target.value})} placeholder="Additional Details"></input> <br />
        <button onClick={event => history.goBack()}>Go Back</button>
        <button onClick={event => addNewMushroom()}>Add</button>
        </>
    );
}

export default AddPhotos;