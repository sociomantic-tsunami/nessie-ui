const ERRORS = {
    PASS_CANNOT_BE_CHANGED : ( label, state ) =>
        `PasswordInput '${label}' cannot be changed since it is ${state}`,
    PASS_CANNOT_BE_BLURED : ( label, state ) =>
        `PasswordInput '${label}' cannot have blur since it is ${state}`,
    PASS_CANNOT_BE_FOCUSED : ( label, state ) =>
        `PasswordInput '${label}' cannot have focus since it is ${state}`,
    PASS_CANNOT_HAVE_KEYPRESS : ( label, state ) =>
        `PasswordInput '${label}' cannot have keyPress since it is ${state}`,
    PASS_CANNOT_MOUSEOVER : ( label, state ) =>
        `PasswordInput '${label}' cannot have onMouseOver since it is ${state}`,
    PASS_CANNOT_MOUSEOUT : ( label, state ) =>
        `PasswordInput '${label}' cannot have onMouseOut since it is ${state}`,

    PASS_CANNOT_CLICKICON : ( label, state ) =>
        `PasswordInput '${label}' cannot have onClickIcon since it is ${state}`,
    PASS_CANNOT_BE_BLUREDICON : ( label, state ) =>
        `PasswordInput '${label}' cannot have onBlurIcon since it is ${state}`,
    PASS_CANNOT_BE_FOCUSEDICON : ( label, state ) =>
        `PasswordInput '${label}' cannot have onFocusIcon since it is ${state}`,
    PASS_CANNOT_MOUSEOVERICON : ( label, state ) =>
        `PasswordInput '${label}' cannot have onMouseOverIcon since it is \
${state}`,
    PASS_CANNOT_MOUSEOUTICON : ( label, state ) =>
        `PasswordInput '${label}' cannot have onMouseOutIcon since it is \
${state}`,
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
            throw new Error( ERRORS
                .PASS_CANNOT_BE_BLURED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_BE_BLURED( label, 'read only' ) );
        }

        this.wrapper.find( 'InputField' ).driver().blur();
        return this;
    }

    focus()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_BE_FOCUSED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_BE_FOCUSED( label, 'read only' ) );
        }

        this.wrapper.find( 'InputField' ).driver().focus();
        return this;
    }

    change( val )
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_BE_CHANGED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_BE_CHANGED( label, 'read only' ) );
        }

        this.wrapper.find( 'InputField' ).driver().change( val );
        return this;
    }

    keyPress()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_HAVE_KEYPRESS( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_HAVE_KEYPRESS( label, 'read only' ) );
        }

        this.wrapper.find( 'InputField' ).driver().keyPress();
        return this;
    }

    mouseOver()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_MOUSEOVER( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_MOUSEOVER( label, 'read only' ) );
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
            throw new Error( ERRORS
                .PASS_CANNOT_MOUSEOUT( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_MOUSEOUT( label, 'read only' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }

    blurIcon()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_BE_BLUREDICON( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_BE_BLUREDICON( label, 'read only' ) );
        }

        this.wrapper.find( 'IconButton' ).driver().blur();
        return this;
    }

    focusIcon()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_BE_FOCUSEDICON( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_BE_FOCUSEDICON( label, 'read only' ) );
        }

        this.wrapper.find( 'IconButton' ).driver().focus();
        return this;
    }

    clickIcon()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_CLICKICON( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_CLICKICON( label, 'read only' ) );
        }

        this.wrapper.find( 'IconButton' ).simulate( 'click' );
        return this;
    }

    mouseOverIcon()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_MOUSEOVERICON( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_MOUSEOVERICON( label, 'read only' ) );
        }

        this.wrapper.find( 'Tooltip' ).driver().mouseOver();
        return this;
    }

    mouseOutIcon()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_MOUSEOUTICON( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .PASS_CANNOT_MOUSEOUTICON( label, 'read only' ) );
        }

        this.wrapper.find( 'Tooltip' ).driver().mouseOut();
        return this;
    }
}
