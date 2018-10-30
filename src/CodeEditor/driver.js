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
    CODEEDITOR_ERR : ( label, event, state ) =>
        `CodeEditor '${label}' cannot simulate ${event} since it is ${state}`,
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
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR.CODEEDITOR_ERR( label, 'focus', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'focus', 'read only' ) );
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
            throw new Error( ERR.CODEEDITOR_ERR( label, 'blur', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.CODEEDITOR_ERR( label, 'blur', 'read only' ) );
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
                .CODEEDITOR_ERR( label, 'change', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'change', 'read only' ) );
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
                .CODEEDITOR_ERR( label, 'mouseOver', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'mouseOver', 'read only' ) );
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
                .CODEEDITOR_ERR( label, 'mouseOut', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CODEEDITOR_ERR( label, 'mouseOut', 'read only' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
