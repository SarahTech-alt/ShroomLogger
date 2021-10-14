import { useParams } from 'react-router-dom';

function EditLog() {
    const allParams = useParams();
    const logId = allParams.id;
    return (
        <>
        <h1>Edit Page</h1>
        </>
    );
}

export default EditLog;