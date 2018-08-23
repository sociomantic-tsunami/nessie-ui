import { Tag } from '../index';

const ERR = {
    TAGINPUT_ERR : ( doWhat, state ) =>
        `TagInput cannot ${doWhat} since it is ${state}`,
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
            throw new Error( ERR
                .TAGINPUT_ERR( 'onClickClose', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR
                .TAGINPUT_ERR( 'onClickClose', 'read only' ) );
        }

        this.wrapper.find( Tag ).at( index ).driver().clickClose();
        return this;
    }

    clickCloseTagByLabel( label )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .TAGINPUT_ERR( 'onClickClose', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR
                .TAGINPUT_ERR( 'onClickClose', 'read only' ) );
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
            throw new Error( ERR.TAGINPUT_ERR( 'onBlur', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onBlur', 'read only' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'blur' );
        return this;
    }

    change()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onChange', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onChange', 'read only' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'change', { 'target': { 'value': 'b' } } );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onFocus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onFocus', 'read only' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'focus' );
        return this;
    }

    keyPress()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onKeyPress', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onKeyPress', 'read only' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'keyPress', { keyCode: 49 } );
        return this;
    }

    keyDown()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onKeyDown', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onKeyDown', 'read only' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'keyDown', { keyCode: 49 } );
        return this;
    }

    keyUp()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onKeyUp', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onKeyUp', 'read only' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'keyUp', { keyCode: 49 } );
        return this;
    }

    mouseOver()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onMouseOver', 'disabled' ) );
        }

        this.control.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'onMouseOut', 'disabled' ) );
        }

        this.control.simulate( 'mouseleave' );
        return this;
    }
}
