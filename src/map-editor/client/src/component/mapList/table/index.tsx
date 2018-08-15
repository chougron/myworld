import * as React from 'react';
import IMap from '../../../../../../shared/types/map';
import './style.css';

interface Props {
    maps: IMap[];
    loadMap: (map: IMap) => void;
    deleteMap: (map: IMap) => void;
}

class MapListTable extends React.Component<Props> {
    render() {
        return (
            <table id="mapListTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {this.props.maps.map((map: IMap) => (
                        <tr key={map._id}>
                            <td>{map.name}</td>
                            <td>
                                <input type="submit" value="Load" onClick={() => this.props.loadMap(map)} />
                                <input type="submit" value="Delete" onClick={() => this.props.deleteMap(map)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}

export default MapListTable;
