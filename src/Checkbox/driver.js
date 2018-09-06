import InputComponentDriver
    from '../Testing/CommonDrivers/inputComponentDriver';

export default class CheckboxDriver extends InputComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.prop( 'cssMap' ).input}` );
        this.outer = wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` );
    }

    setChecked()
    {
        const node = this.control.instance();

        if ( !node.checked )
        {
            node.checked  = true;
            this.control.simulate( 'change' );
        }

        return this;
    }

    setUnchecked()
    {
        const node = this.control.instance();

        if ( node.checked )
        {
            node.checked = false;
            this.control.simulate( 'change' );
        }

        return this;
    }

    toggleChecked()
    {
        const node   = this.control.instance();
        node.checked = !node.checked;
        this.control.simulate( 'change' );
        return this;
    }

    getChecked()
    {
        return this.control.instance().checked;
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
