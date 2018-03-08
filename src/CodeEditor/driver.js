const ERRORS = {
    EDITOR_READ_ONLY : 'Cannot change the CodeEditor value since it is read-only' // eslint-disable-line max-len
};

export default class CodeEditorDriver
{
    constructor( wrapper )
    {
        // Nessie Control
        this.wrapper = wrapper;
        // the 3rd party control
        this.control = wrapper.instance().codeMirror;
    }

    focus()
    {
        this.control.focus();
        return this;
    }

    blur()
    {
        /* eslint-disable no-undef */
        if ( this.control.hasFocus() && Boolean( document ) &&
            Boolean( document.activeElement ) )
        {
            document.activeElement.blur();
        }
        /* eslint-enable no-undef */
        return this;
    }

    setInputValue( value )
    {
        if ( this.isReadOnly() )
        {
            throw new Error( ERRORS.EDITOR_READ_ONLY );
        }

        this.focus();
        this.control.setValue( value );
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
        return Boolean( this.control.options.readOnly );
    }

    isDisabled()
    {
        return this.control.options.readOnly === 'nocursor';
    }
}
