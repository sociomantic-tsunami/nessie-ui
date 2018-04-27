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
        const value = this.control.node.value;
        this.control.simulate( 'change', { target: { checked: true, value } } );
        return this;
    }

    setUnchecked()
    {
        this.control.node.checked = false;
        const value = this.control.node.value;
        this.control.simulate( 'change',
            { target: { checked: false, value } } );
        return this;
    }

    toggleChecked()
    {
        const status = this.getChecked();
        const value = this.control.node.value;
        this.control.node.checked = !status;
        this.control.simulate( 'change',
            { target: { checked: !status, value } } );
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
