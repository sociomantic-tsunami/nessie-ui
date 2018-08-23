import { IconButton, InputField, Tooltip } from '../index';

const ERR = {
    PASS_ERR : ( label, onEvent, state ) =>
        `PasswordInput '${label}' cannot ${onEvent} since it is ${state}`,
};

export default class PasswordInput
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR.PASS_ERR( label, 'onBlur', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( label, 'onBlur', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().blur();
        return this;
    }

    focus()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR.PASS_ERR( label, 'onFocus', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( label, 'onFocus', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().focus();
        return this;
    }

    change( val )
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR.PASS_ERR( label, 'onChange', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( label, 'onChange', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().change( val );
        return this;
    }

    keyPress()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR.PASS_ERR( label, 'onKeyPress', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( label, 'onKeyPress', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().keyPress();
        return this;
    }

    mouseOver()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR.PASS_ERR( label, 'onMouseOver', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .PASS_ERR( label, 'onMouseOver', 'read only' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR.PASS_ERR( label, 'onMouseOut', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( label, 'onMouseOut', 'read only' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }

    clickIcon()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR.PASS_ERR( label, 'onClickIcon', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .PASS_ERR( label, 'onClickIcon', 'read only' ) );
        }

        this.wrapper.find( IconButton ).simulate( 'click' );
        return this;
    }

    mouseOverIcon()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .PASS_ERR( label, 'onMouseOverIcon', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .PASS_ERR( label, 'onMouseOverIcon', 'read only' ) );
        }

        this.wrapper.find( Tooltip ).driver().mouseOver();
        return this;
    }

    mouseOutIcon()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .PASS_ERR( label, 'onMouseOutIcon', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .PASS_ERR( label, 'onMouseOutIcon', 'read only' ) );
        }

        this.wrapper.find( Tooltip ).driver().mouseOut();
        return this;
    }
}
