import Map from '../map';
import Axios from 'axios';
import IMap from '../../../../shared/types/map';
import ITile from '../../../../shared/types/tile';
import Tile from '../utils/tile';

const formatMapToJson = (map: Map): IMap => {
    const json = {
        _id: map._id,
        name: map.name,
        tiles: map.tiles.map(
            (tiles: Tile[]): ITile[] =>
                tiles.map(
                    (tile: Tile): ITile => {
                        return {
                            position: { x: tile.getX(), y: tile.getY() },
                            tilesetNumber: tile.tilesetNumber,
                        };
                    },
                ),
        ),
    };

    return json;
};

const saveMap = async (map: Map): Promise<IMap> => {
    const json = formatMapToJson(map);
    const answer = await Axios.post('http://localhost:8999/maps', json);
    return answer.data;
};

const loadMaps = async (): Promise<IMap[]> => {
    const answer = await Axios.get('http://localhost:8999/maps');
    return answer.data;
};

export { saveMap, loadMaps };
