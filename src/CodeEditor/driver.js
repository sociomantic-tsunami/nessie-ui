/* global document */

const ERRORS = {
    EDITOR_READ_ONLY : 'Cannot change the CodeEditor value since it’s read only'
};

export default class CodeEditorDriver
{
    constructor( wrapper )
    {
        // Nessie Control
        this.wrapper = wrapper;
        // the 3rd party control
        this.control = wrapper.node.codeMirror;
    }

    focus()
    {
        this.control.focus();
        return this;
    }

    blur()
    {
        if ( this.control.hasFocus() && Boolean( document ) &&
            Boolean( document.activeElement ) )
        {
            document.activeElement.blur();
        }
        return this;
    }

    setInputValue( value )
    {
        if ( this.isReadOnly() )
        {
            throw new Error( ERRORS.EDITOR_READ_ONLY );
        }

        const onChange = this.wrapper.prop( 'onChange' );

        this.focus();
        this.control.setValue( value );
        if ( onChange )
        {
            onChange( this.getInputValue() );
        }
        this.blur();
        return this;
    }

    clearInputValue()
    {
        return this.setInputValue( '' );
    }

    getInputValue()
    {
        return this.control.getValue();
    }

    isReadOnly()
    {
        return Boolean( this.control.options.readOnly ) && !this.isDisabled();
    }

    isDisabled()
    {
        return this.control.options.readOnly === 'nocursor';
    }
}
