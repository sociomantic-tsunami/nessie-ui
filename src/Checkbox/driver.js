import InputComponentDriver
    from '../Testing/CommonDrivers/inputComponentDriver';

export default class CheckboxDriver extends InputComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.input}` );
        this.outer = wrapper.find( `.${wrapper.props().cssMap.default}` );
    }

    setChecked()
    {
        this.control.node.checked = true;
        this.control.simulate( 'change', { target: { checked: true } } );
        return this;
    }

    setUnchecked()
    {
        this.control.node.checked = false;
        this.control.simulate( 'change', { target: { checked: false } } );
        return this;
    }

    toggleChecked()
    {
        const status = this.getChecked();
        this.control.node.checked = !status;
        this.control.simulate( 'change', { target: { checked: !status } } );
        return this;
    }

    getChecked()
    {
        return this.control.getNode().checked;
    }

    mouseOver()
    {
        this.outer.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.outer.simulate( 'mouseleave' );
        return this;
    }
}
