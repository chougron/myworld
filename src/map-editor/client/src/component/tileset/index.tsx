import * as React from 'react';
import './style.css';
import ITile from '../../../../../shared/types/tile';
import Tile from '../tile';
import ICoordinates from '../../../../../shared/types/coordinates';

interface Props {
    selectTile: (tile: ITile) => void;
}

interface State {
    selected: ITile;
}

class Tileset extends React.Component<Props, State> {
    static WIDTH: number = 20;
    static HEIGHT: number = 25;

    public tiles: ITile[] = [];

    constructor(props: Props) {
        super(props);

        for (var x = 0; x < Tileset.WIDTH; x++) {
            for (var y = 0; y < Tileset.HEIGHT; y++) {
                const tilesetNumber = x + y * Tileset.WIDTH;
                this.tiles.push({
                    position: { x, y },
                    tilesetNumber,
                });
            }
        }
    }

    render() {
        return (
            <div id="tileset">
                {this.tiles.map((tile: ITile) => {
                    const onClick = () => {
                        this.click(tile);
                    };
                    const selected = this.isSelected(tile);
                    return <Tile tile={tile} onClick={onClick} selected={selected} border={true} />;
                })}
            </div>
        );
    }

    click = (tile: ITile): void => {
        this.setState({
            ...this.state,
            selected: tile,
        });
        this.props.selectTile(tile);
    };

    isSelected = (tile: ITile): boolean => {
        if (!this.state || !this.state.selected) {
            return false;
        }

        return this.state.selected.position.x === tile.position.x && this.state.selected.position.y === tile.position.y;
    };
}

export default Tileset;
