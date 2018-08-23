/* global document */
const ERR = {
    CODEEDITOR_ERR : ( label, onEvent, state ) =>
        `CodeEditor '${label}' cannot ${onEvent} since it is ${state}`,
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
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'onFocus', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'onFocus', 'read only' ) );
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
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'onBlur', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'onBlur', 'read only' ) );
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
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'onChange', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'onChange', 'read only' ) );
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
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'onMouseOver', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'onMouseOver', 'read only' ) );
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
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'onMouseOut', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'onMouseOut', 'read only' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
