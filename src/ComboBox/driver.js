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
        this.wrapper.find( 'InputField' ).driver().blur();
        return this;
    }

    changeInput()
    {
        this.wrapper.find( 'InputField' ).driver().pressKey( 'c' );
        return this;
    }

    clickInput()
    {
        this.wrapper.find( 'InputField' ).driver().click();
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
        this.wrapper.find( 'InputField' ).driver().focus();
        return this;
    }

    keyDown()
    {
        this.wrapper.find( 'InputField' ).simulate( 'keyDown' );
        return this;
    }

    keyPress()
    {
        this.wrapper.find( 'InputField' ).driver().pressKey( 'a' );
        return this;
    }

    keyUp()
    {
        this.wrapper.find( 'InputField' ).simulate( 'keyUp' );
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
