/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document */

const ERR = {
    CODEEDITOR_ERR : ( event, state ) =>
        `CodeEditor cannot simulate ${event} since it is ${state}`,
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

    getCodeMirrorAPI()
    {
        return this.control;
    }

    focus()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR.CODEEDITOR_ERR( 'focus', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( 'focus', 'read only' ) );
        }

        this.control.focus();
        return this;
    }

    blur()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR.CODEEDITOR_ERR( 'blur', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.CODEEDITOR_ERR( 'blur', 'read only' ) );
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
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( 'change', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( 'change', 'read only' ) );
        }

        this.control.setValue( val );
        this.wrapper.prop( 'onChange' )( this.control.getValue() );

        return this;
    }

    mouseOver()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( 'mouseOver', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( 'mouseOver', 'read only' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( 'mouseOut', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( 'mouseOut', 'read only' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
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
            throw new Error( ERR
                .CODEEDITOR_ERR( 'setInputValue', 'read only' ) );
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
