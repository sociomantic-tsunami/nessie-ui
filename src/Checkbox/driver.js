export default class CheckboxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.control = this.wrapper.find( 'input' ).first();
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
}
