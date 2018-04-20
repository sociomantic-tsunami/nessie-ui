const ERR = {
    DISABLED : () => 'Cannot trigger event on the disabled option'
};

export default class ComboBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        this.wrapper.find( 'InputField' ).simulate( 'blur' );
        return this;
    }

    changeInput()
    {
        this.wrapper.find( 'TextInputWithIcon' ).simulate( 'change' );
        return this;
    }

    clickOption( index = 0 )
    {
        const option = this.wrapper.find( 'ListBoxOption' ).at( index );

        if ( option.props().isDisabled )
        {
            throw new Error(
                ERR.DISABLED()
            );
        }

        option.simulate( 'click' );
        return this;
    }

    focus()
    {
        this.wrapper.find( 'InputField' ).simulate( 'focus' );
        return this;
    }

    keyDown()
    {
        this.wrapper.simulate( 'keyDown' );
        return this;
    }

    keyPress()
    {
        this.wrapper.simulate( 'keyPress' );
        return this;
    }

    keyUp()
    {
        this.wrapper.simulate( 'keyUp' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }

    mouseOutOption( index = 0 )
    {
        const option = this.wrapper.find( 'ListBoxOption' ).at( index );

        if ( option.props().isDisabled )
        {
            throw new Error(
                ERR.DISABLED()
            );
        }

        option.simulate( 'mouseleave' );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOverOption( index = 0 )
    {
        const option = this.wrapper.find( 'ListBoxOption' ).at( index );

        if ( option.props().isDisabled )
        {
            throw new Error(
                ERR.DISABLED()
            );
        }

        option.simulate( 'mouseenter' );
        return this;
    }

    scroll()
    {
        this.wrapper.find( 'ScrollBox' ).driver().scrollVertical( 0.3 );
        return this;
    }
}
