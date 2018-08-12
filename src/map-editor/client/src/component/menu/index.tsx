import * as React from 'react';
import './style.css';

interface Props {
    name: string;
    setName: (name: string) => void;
    save: () => void;
    load: () => void;
    new: () => void;
    currentLayer: number;
    maxLayer: number;
    setLayer: (layer: number) => void;
    removeLayer: () => void;
    addLayer: () => void;
}

class Menu extends React.Component<Props> {
    nameInput: HTMLInputElement;
    layerSelect: HTMLSelectElement;

    render() {
        const options = [];
        for (let i = 1; i <= this.props.maxLayer; i++) {
            options.push(
                <option value={i}>
                    {i} (of {this.props.maxLayer})
                </option>,
            );
        }

        return (
            <div id="menu">
                <input
                    type="text"
                    value={this.props.name}
                    ref={el => (this.nameInput = el)}
                    onChange={this.changeName}
                />
                <input type="submit" value="Save" onClick={this.props.save} />
                <input type="submit" value="Load" onClick={this.props.load} />
                <input type="submit" value="New" onClick={this.props.new} />
                <div>
                    Layer:{' '}
                    <select
                        value={this.props.currentLayer}
                        onChange={this.changeLayer}
                        ref={el => (this.layerSelect = el)}
                    >
                        {options.map(option => option)}
                    </select>
                    {this.props.maxLayer > 1 && <input type="submit" value="-" onClick={this.props.removeLayer} />}
                    <input type="submit" value="+" onClick={this.props.addLayer} />
                </div>
            </div>
        );
    }

    changeName = (): void => {
        this.props.setName(this.nameInput.value);
    };

    changeLayer = (): void => {
        const layer = Number.parseInt(this.layerSelect.value, 10);
        this.props.setLayer(layer);
    };
}

export default Menu;
