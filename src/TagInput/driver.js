/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { Tag } from 'nessie-ui';

const ERR = {
    TAGINPUT_ERR : ( event, state ) =>
        `TagInput cannot simulate ${event} since it is ${state}`,
};

export default class TagInputDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickClose( index = 0 )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .TAGINPUT_ERR( 'clickClose', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR
                .TAGINPUT_ERR( 'clickClose', 'read only' ) );
        }

        this.wrapper.find( Tag ).at( index ).driver().clickClose();
        return this;
    }

    blur()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'blur', 'disabled' ) );
        }

        this.wrapper.find( `.${this.wrapper.props().cssMap.input}` )
            .simulate( 'blur' );
        return this;
    }

    change( val )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'change', 'read only' ) );
        }

        this.wrapper.find( `.${this.wrapper.props().cssMap.input}` )
            .simulate( 'change', { 'target': { val } } );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'focus', 'disabled' ) );
        }

        this.wrapper.find( `.${this.wrapper.props().cssMap.input}` )
            .simulate( 'focus' );
        return this;
    }

    keyPress( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'keyPress', 'disabled' ) );
        }

        this.wrapper.find( `.${this.wrapper.props().cssMap.input}` )
            .simulate( 'keyPress', { keyCode, which: keyCode } );
        return this;
    }

    keyDown( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'keyDown', 'disabled' ) );
        }

        this.wrapper.find( `.${this.wrapper.props().cssMap.input}` )
            .simulate( 'keyDown', { keyCode, which: keyCode } );
        return this;
    }

    keyUp( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'keyUp', 'disabled' ) );
        }

        this.wrapper.find( `.${this.wrapper.props().cssMap.input}` )
            .simulate( 'keyUp', { keyCode, which: keyCode } );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
