import { useLocation, useParams, useNavigate } from 'react-router-dom';
export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
export const useDecodedData = (paramName) => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const encodedData = queryParams.get(paramName);

    let decodedData = null;

    try {
        if (encodedData) {
            decodedData = JSON.parse(atob(encodedData));
        }
    } catch (error) {
        console.error('Error decoding or parsing data:', error);
    }

    return decodedData;
};




export const useDecodedId = () => {
    const { encodedId } = useParams();
    const navigate = useNavigate();
    let decodedId= null;

    try {
        if (encodedId != null) {
            decodedId = atob(encodedId);
            if (isNaN(decodedId)) {
                alert("Can't allow value on URL");
                navigate("/")
            }
        }

    } catch (error) {
        console.error('Error decoding or parsing data:', error);
        alert("Can't allow value on URL");
        navigate("/")
    }

    return decodedId;
};
