export default class TagInputDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickCloseTagByIndex( index = 0 )
    {
        this.wrapper.find( 'Tag' ).at( index ).driver().clickClose();
        return this;
    }

    clickCloseTagByLabel( label )
    {
        if ( Array.isArray( label ) )
        {
            let value;

            value.forEach( i =>
            {
                const item =
                    this.wrapper.findWhere( n =>
                        n.prop( 'label' ) === i ).first();
                item.find( `.${this.wrapper.prop( 'cssMap' ).delete}` )
                    .simulate( 'click' );
            } );
        }
        else
        {
            const item =
                this.wrapper.findWhere( n =>
                    n.prop( 'label' ) === label ).first();
            item.find( `.${this.wrapper.prop( 'cssMap' ).delete}` )
                .simulate( 'click' );
        }

        return this;
    }

    blur()
    {
        this.wrapper.simulate( 'blur' );
        return this;
    }

    change()
    {
        this.wrapper.simulate( 'change', { 'target': { 'value': 'b' } } );
        return this;
    }

    focus()
    {
        this.wrapper.simulate( 'focus' );
        return this;
    }

    keyPress()
    {
        // if ( this.wrapper.props().isDisabled )
        // {
        //     throw new Error( ERR
        //         .INPUTFIELD_ERROR( 'keyPress', 'disabled' ) );
        // }
        //
        // if ( this.wrapper.props().isReadOnly )
        // {
        //     throw new Error( ERR
        //         .INPUTFIELD_ERROR( 'keyPress', 'read only' ) );
        // }

        this.wrapper.simulate( 'keyPress', { keyCode: 49 } );
        return this;
    }

    keyDown()
    {
        // if ( this.wrapper.props().isDisabled )
        // {
        //     throw new Error( ERR
        //         .INPUTFIELD_ERROR( 'keyDown', 'disabled' ) );
        // }
        //
        // if ( this.wrapper.props().isReadOnly )
        // {
        //     throw new Error( ERR
        //         .INPUTFIELD_ERROR( 'keyDown', 'read only' ) );
        // }

        this.wrapper.simulate( 'keyDown', { keyCode: 49 } );
        return this;
    }

    keyUp()
    {
        // if ( this.wrapper.props().isDisabled )
        // {
        //     throw new Error( ERR
        //         .INPUTFIELD_ERROR( 'keyUp', 'disabled' ) );
        // }
        //
        // if ( this.wrapper.props().isReadOnly )
        // {
        //     throw new Error( ERR
        //         .INPUTFIELD_ERROR( 'keyUp', 'read only' ) );
        // }

        this.wrapper.simulate( 'keyUp', { keyCode: 49 } );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
