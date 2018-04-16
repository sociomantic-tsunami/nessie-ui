import ClickableComponentDriver
    from '../Testing/CommonDrivers/clickableComponentDriver';


export default class ToggleButtonDriver extends ClickableComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
    }

    toggle()
    {
        const status = this.getChecked();
        this.control.node.checked = !status;
        this.control.simulate( 'click', { target: { checked: !status } } );
        return this;
    }

    getChecked()
    {
        return this.control.getNode().checked;
    }
}
