import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function AddLocationTime() {

    const [location, setLocation] = useState({});

    useEffect(() => {
        axios.post(`api/mushroom/map/`)
            .then(res => {
                console.log(res);
                setLocation(res)
            })
            .catch(
                error => {
                    console.log('there was an error posting');
                }
            )
    }, []);

  

    return (
        <>
            <h1>In Add Location and Time</h1>
            {JSON.stringify(location)}

        </>
    );
}

export default AddLocationTime;