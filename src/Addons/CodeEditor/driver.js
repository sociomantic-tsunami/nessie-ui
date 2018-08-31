/* global document */

const ERRORS = {
    EDITOR_READ_ONLY :
        'Cannot change the CodeEditor value since it’s read only',
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
        if ( this.control.hasFocus() && Boolean( document ) &&
            Boolean( document.activeElement ) )
        {
            document.activeElement.blur();
        }
        return this;
    }

    /**
     * Simulates the pressing of a given key. In case of a printable character
     * the input will be updated accordingly as well.
     * @param {Integer} keyCode the integer code of a key
     * @return {InputComponentDriver} this driver (for chaining commands)
     */
    pressKey( keyCode )
    {
        if ( isCharPrintable( keyCode ) )
        {
            const oldVal = this.control.getValue();
            this.control.setValue( oldVal + String.fromCharCode( keyCode ) );
            const onChange = this.wrapper.prop( 'onChange' );
            if ( onChange )
            {
                onChange( this.getInputValue() );
            }
        }

        return this;
    }

    /**
    * Pressing each character of the value one by one.
    * @param {String} value a value press
    * @return {InputComponentDriver} this driver (for chaining commands)
    */
    inputValue( value )
    {
        const FIRST_CHARACTER = 0;
        const keys = value.toString().split( '' );

        keys.forEach( key =>
        {
            const keyCode = key.charCodeAt( FIRST_CHARACTER );
            this.pressKey( keyCode );
        } );

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

function isCharPrintable( keyCode )
{
    const blackList = [
        13, // Enter
    ];

    return !blackList.includes( keyCode );
}
