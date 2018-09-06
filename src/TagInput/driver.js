/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { Tag } from '../index';

const ERR = {
    TAGINPUT_ERR : ( event, state ) =>
        `TagInput cannot simulate ${event} since it is ${state}`,
};

export default class TagInputDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.control = wrapper.find( 'InputContainer' );
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

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'blur', 'read only' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'blur' );
        return this;
    }

    change()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'change', 'read only' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'change', { 'target': { 'value': 'b' } } );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'focus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'focus', 'read only' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'focus' );
        return this;
    }

    keyPress()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'keyPress', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'keyPress', 'read only' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'keyPress', { keyCode: 49 } );
        return this;
    }

    keyDown()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'keyDown', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'keyDown', 'read only' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'keyDown', { keyCode: 49 } );
        return this;
    }

    keyUp()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'keyUp', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'keyUp', 'read only' ) );
        }

        this.control.find( `.${this.control.props().cssMap.input}` )
            .simulate( 'keyUp', { keyCode: 49 } );
        return this;
    }

    mouseOver()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'mouseOver', 'disabled' ) );
        }

        this.control.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TAGINPUT_ERR( 'mouseOut', 'disabled' ) );
        }

        this.control.simulate( 'mouseleave' );
        return this;
    }
}
