import { IconButton, InputField, Tooltip } from '../index';

const ERR = {
    PASS_ERR : ( label, event, state ) => `PasswordInput '${label}' cannot \
simulate ${event} since it is ${state}`,
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
            throw new Error( ERR.PASS_ERR( label, 'blur', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( label, 'blur', 'read only' ) );
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
            throw new Error( ERR.PASS_ERR( label, 'focus', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( label, 'focus', 'read only' ) );
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
            throw new Error( ERR.PASS_ERR( label, 'change', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( label, 'change', 'read only' ) );
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
            throw new Error( ERR.PASS_ERR( label, 'keyPress', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( label, 'keyPress', 'read only' ) );
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
            throw new Error( ERR.PASS_ERR( label, 'mouseOver', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( label, 'mouseOver', 'read only' ) );
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
            throw new Error( ERR.PASS_ERR( label, 'mouseOut', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( label, 'mouseOut', 'read only' ) );
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
            throw new Error( ERR.PASS_ERR( label, 'clickIcon', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( label, 'clickIcon', 'read only' ) );
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
                .PASS_ERR( label, 'mouseOverIcon', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .PASS_ERR( label, 'mouseOverIcon', 'read only' ) );
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
                .PASS_ERR( label, 'mouseOutIcon', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .PASS_ERR( label, 'mouseOutIcon', 'read only' ) );
        }

        this.wrapper.find( Tooltip ).driver().mouseOut();
        return this;
    }
}
