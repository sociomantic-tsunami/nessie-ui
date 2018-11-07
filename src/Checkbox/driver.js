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
        const node = this.control.getNode();

        if ( !node.checked )
        {
            node.checked  = true;
            this.control.simulate( 'change' );
        }

        return this;
    }

    setUnchecked()
    {
        const node = this.control.getNode();

        if ( node.checked )
        {
            node.checked = false;
            this.control.simulate( 'change' );
        }

        return this;
    }

    toggleChecked()
    {
        const node   = this.control.getNode();
        node.checked = !node.checked;
        this.control.simulate( 'change' );
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
