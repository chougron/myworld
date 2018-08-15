import Axios from 'axios';
import IMap from '../../../../shared/types/map';

const loadMap = async (id: string): Promise<IMap> => {
    const answer = await Axios.get(`http://localhost:9888/maps/${id}`);
    return answer.data;
};

export { loadMap };
