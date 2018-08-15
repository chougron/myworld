import * as React from 'react';
import IMap from '../../../../../shared/types/map';
import './style.css';
import MapListTable from './table';

interface Props {
    maps: IMap[];
    loadMap: (map: IMap) => void;
    deleteMap: (map: IMap) => void;
}

class MapList extends React.Component<Props> {
    render() {
        return (
            <div id="mapList">
                <MapListTable maps={this.props.maps} loadMap={this.props.loadMap} deleteMap={this.props.deleteMap} />
            </div>
        );
    }
}

export default MapList;
