import MenuDrawer from './views/menudrawer';

export default class Menu {
    public menuDrawer: MenuDrawer;

    constructor(onSave: (event: MouseEvent) => void) {
        this.menuDrawer = new MenuDrawer();
        this.menuDrawer.getSaveButton().onclick = onSave;
    }
}
