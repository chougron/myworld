import Axios from 'axios';
import IMap from '../../../../shared/types/map';

const saveMap = async (map: IMap): Promise<IMap> => {
    const answer = await Axios.post('http://localhost:8999/maps', map);
    return answer.data;
};

const loadMaps = async (): Promise<IMap[]> => {
    const answer = await Axios.get('http://localhost:8999/maps');
    return answer.data;
};

export { saveMap, loadMaps };
