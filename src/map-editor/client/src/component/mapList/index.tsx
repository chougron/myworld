import * as React from 'react';
import IMap from '../../../../../shared/types/map';
import './style.css';
import MapListTable from './table';

interface Props {
    maps: IMap[];
    loadMap: (map: IMap) => void;
}

class MapList extends React.Component<Props> {
    render() {
        return (
            <div id="mapList">
                <MapListTable maps={this.props.maps} loadMap={this.props.loadMap} />
            </div>
        );
    }
}

export default MapList;
