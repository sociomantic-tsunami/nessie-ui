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

        this.content = wrapper.find( 'InputContainer' ).first();
    }

    getCodeMirrorAPI()
    {
        return this.control;
    }

    focus()
    {
        const props     = this.wrapper.props();

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
        const props     = this.wrapper.props();

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
        const props     = this.wrapper.props();

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
        const props     = this.wrapper.props();

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
        const props     = this.wrapper.props();

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
}
