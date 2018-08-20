const ERR = {
    INPUT_DISABLED : ( doWhat ) => `Input can't ${doWhat} since it is disabled`,
    INPUT_READONLY : ( doWhat ) =>
        `Input can't ${doWhat} since it is read only`,
};

export default class TagInputDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.control = wrapper.find( 'InputContainer' );
    }

    clickCloseTagByIndex( index = 0 )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'clickCloseTagByIndex' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUT_READONLY( 'clickCloseTagByIndex' ) );
        }

        this.wrapper.find( 'Tag' ).at( index ).driver().clickClose();
        return this;
    }

    clickCloseTagByLabel( label )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'clickCloseTagByLabel' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUT_READONLY( 'clickCloseTagByLabel' ) );
        }

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
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'blur' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUT_READONLY( 'blur' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'blur' );
        return this;
    }

    change()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'change' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUT_READONLY( 'change' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'change', { 'target': { 'value': 'b' } } );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'focus' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUT_READONLY( 'focus' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'focus' );
        return this;
    }

    keyPress()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'keyPress' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUT_READONLY( 'keyPress' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'keyPress', { keyCode: 49 } );
        return this;
    }

    keyDown()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'keyDown' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUT_READONLY( 'keyDown' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'keyDown', { keyCode: 49 } );
        return this;
    }

    keyUp()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'keyUp' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.INPUT_READONLY( 'keyUp' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'keyUp', { keyCode: 49 } );
        return this;
    }

    mouseOver()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'mouseOver' ) );
        }

        this.control.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.INPUT_DISABLED( 'mouseOut' ) );
        }

        this.control.simulate( 'mouseleave' );
        return this;
    }
}
