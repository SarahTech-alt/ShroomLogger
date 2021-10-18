import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';


function AddPhotos() {
    // use history for user navigation between pages
    const history = useHistory();
    // use to dispatch events to sagas
    const dispatch = useDispatch();
    // hook for storing input data
    const [newMushroom, setNewMushroom] = useState({
        common_name: '',
        scientific_name: '',
        latitude: '',
        longitude: '',
        date: moment().format(),
        details: '',
        mushroom_picture_url: '',

    });
        // dispatch newMushroom info from inputs to loghistory.saga
        const addNewMushroom = () => {
            dispatch({ type: 'ADD_NEW_MUSHROOM', payload: newMushroom})
            history.push('/home');
        }


    return(
        <>
        <p>picture upload placeholder</p>
        <input type="text" value={newMushroom.commonName} onChange={(event) => setNewMushroom({ ... newMushroom, common_name: event.target.value})} placeholder="Common Name"></input> <br />

        <input type="text" value={newMushroom.scientificName} onChange={(event) => setNewMushroom({ ... newMushroom, scientific_name: event.target.value})} placeholder="Scientific Name (optional)"></input><br />

        <input type="text" value={newMushroom.latitude} onChange={(event) => setNewMushroom({ ... newMushroom, latitude: event.target.value})} placeholder="Latitude"></input> <br />

        <input type="text" value={newMushroom.longitude} onChange={(event) => setNewMushroom({ ... newMushroom, longitude: event.target.value})} placeholder="Longitude"></input> <br />

        <input type="date" onChange={(event) => setNewMushroom({ ... newMushroom, date: moment(event.target.value).format()})} placeholder="When"></input> <br />


        <input type="text" value={newMushroom.mushroom_picture_url} onChange={(event) => setNewMushroom({ ... newMushroom, mushroom_picture_url: event.target.value})} placeholder="URL"></input> <br />

        <input type="text" value={newMushroom.details} onChange={(event) => setNewMushroom({ ... newMushroom, details: event.target.value})} placeholder="Details"></input> <br />

        <button onClick={event => history.goBack()}>Go Back</button>
        <button onClick={event => addNewMushroom()}>Add</button>
        </>
    );
}

export default AddPhotos;