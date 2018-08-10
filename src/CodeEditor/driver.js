/* global document */
const ERRORS = {
    CODEEDITOR_CANNOT_BE_CHANGED : ( label, state ) =>
        `CodeEditor '${label}' cannot be changed since it is ${state}`,
    CODEEDITOR_CANNOT_BE_BLURED : ( label, state ) =>
        `CodeEditor '${label}' cannot have blur since it is ${state}`,
    CODEEDITOR_CANNOT_BE_FOCUSED : ( label, state ) =>
        `CodeEditor '${label}' cannot have focus since it is ${state}`,
    CODEEDITOR_CANNOT_MOUSEOVER : ( label, state ) =>
        `CodeEditor '${label}' cannot have onMouseOver since it is ${state}`,
    CODEEDITOR_CANNOT_MOUSEOUT : ( label, state ) =>
        `CodeEditor '${label}' cannot have onMouseOut since it is ${state}`,
};

export default class CodeEditorDriver
{
    constructor( wrapper )
    {
        // Nessie Control
        this.wrapper = wrapper;
        // the 3rd party control
        this.control = wrapper.node.codeMirror;

        this.content = wrapper.find( 'InputContainer' ).first();
    }


    focus()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .CODEEDITOR_CANNOT_BE_FOCUSED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .CODEEDITOR_CANNOT_BE_FOCUSED( label, 'read only' ) );
        }

        this.control.focus();
        return this;
    }

    blur()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .CODEEDITOR_CANNOT_BE_BLURED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .CODEEDITOR_CANNOT_BE_BLURED( label, 'read only' ) );
        }

        if ( this.control.hasFocus() && Boolean( document ) &&
            Boolean( document.activeElement ) )
        {
            document.activeElement.blur();
        }

        return this;
    }

    change( val )
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .CODEEDITOR_CANNOT_BE_CHANGED( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .CODEEDITOR_CANNOT_BE_CHANGED( label, 'read only' ) );
        }

        this.control.setValue( val );
        this.wrapper.prop( 'onChange' )( this.control.getValue() );
        return this;
    }

    mouseOver()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .CODEEDITOR_CANNOT_MOUSEOVER( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .CODEEDITOR_CANNOT_MOUSEOVER( label, 'read only' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .CODEEDITOR_CANNOT_MOUSEOUT( label, 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERRORS
                .CODEEDITOR_CANNOT_MOUSEOUT( label, 'read only' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
