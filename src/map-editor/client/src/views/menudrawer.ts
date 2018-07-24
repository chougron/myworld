import TilesetDrawer from './tilesetdrawer';
import TileDrawer from './tiledrawer';

export default class MenuDrawer {
    private drawer: HTMLDivElement;
    private nameInput: HTMLInputElement;
    private saveButton: HTMLButtonElement;
    private loadButton: HTMLButtonElement;

    constructor() {
        const body = document.body;

        this.drawer = document.createElement('div');
        this.drawer.style.border = '1px solid black';
        this.drawer.style.width = TilesetDrawer.WIDTH_CELL * TileDrawer.SIZE + 'px';
        this.drawer.style.right = '0';
        this.drawer.style.top = '0';
        this.drawer.style.height = '40px';
        this.drawer.style.boxSizing = 'border-box';
        this.drawer.style.position = 'absolute';
        this.drawer.style.overflow = 'hidden';

        this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';

        this.saveButton = document.createElement('button');
        this.saveButton.innerHTML = 'Save';

        this.loadButton = document.createElement('button');
        this.loadButton.innerHTML = 'Load';

        this.drawer.appendChild(this.nameInput);
        this.drawer.appendChild(this.saveButton);
        this.drawer.appendChild(this.loadButton);

        body.appendChild(this.drawer);
    }

    public getDrawer = (): HTMLDivElement => this.drawer;
    public getNameInput = (): HTMLInputElement => this.nameInput;
    public getSaveButton = (): HTMLButtonElement => this.saveButton;
    public getLoadButton = (): HTMLButtonElement => this.loadButton;
}
