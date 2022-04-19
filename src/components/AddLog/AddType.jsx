import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'

function AddType() {
    const newMushroom = useSelector(store => store.logHistory.logToAdd);
    const [showScientific, setShowScientific] = useState(false);

    return (
        <div>
            {/* {JSON.stringify(newMushroom)}<br /> */}
            <TextField
                id="component-outlined"
                required
                onChange={event => ({ ...newMushroom.common_name = event.target.value })}
                helperText="common name"
                placeholder='whatdya call it?*'
            /><br />
            <input type="checkbox" id="unknownName" name="check if unknown" value="Unknown" onChange={event => ({ ...newMushroom.common_name = event.target.value })} />
            <label for="unknownName">Check if unknown</label><br />
            <input type="checkbox" id="scientificName" name="check if unknown" value="Unknown" onChange={e => setShowScientific(scientificState => !scientificState)} />
            <label for="unknownName">Add Scientific Name</label><br />

            {showScientific &&
                <TextField
                    id="component-outlined"
                    onChange={event => ({ ...newMushroom.scientific_name = event.target.value })}
                    helperText="scientific name"
                    placeholder='what is it in the books?'
                />
            }
            <br />
        </div>
    );
}

export default AddType;