import * as React from 'react';
import IMap from '../../../../../shared/types/map';
import './style.css';

interface Props {
    maps: IMap[];
}

class MapList extends React.Component<Props> {
    render() {
        return <div id="mapList">{this.props.maps.map((map: IMap) => <div key={map._id}>{map.name}</div>)}</div>;
    }
}

export default MapList;
