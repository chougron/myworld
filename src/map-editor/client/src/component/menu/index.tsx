import * as React from 'react';
import './style.css';

interface Props {
    name: string;
    setName: (name: string) => void;
    save: () => void;
    load: () => void;
}

class Menu extends React.Component<Props> {
    nameInput: HTMLInputElement;

    render() {
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
            </div>
        );
    }

    changeName = (): void => {
        this.props.setName(this.nameInput.value);
    };
}

export default Menu;
