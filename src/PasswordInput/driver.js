/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { IconButton, InputField, Tooltip } from 'nessie-ui';

const ERR = {
    PASS_ERR : ( event, state ) => `PasswordInput cannot simulate ${event} \
since it is ${state}`,
};

export default class PasswordInput
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR.PASS_ERR( 'blur', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().blur();
        return this;
    }

    focus()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR.PASS_ERR( 'focus', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().focus();
        return this;
    }

    change( val )
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR.PASS_ERR( 'change', 'disabled' ) );
        }

        if ( props.isReadOnly || props.isReadOnlyInput )
        {
            throw new Error( ERR.PASS_ERR( 'change', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().change( val );
        return this;
    }

    keyPress( keyCode )
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR.PASS_ERR( 'keyPress', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().keyPress( keyCode );
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

    clickIcon()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR.PASS_ERR( 'clickIcon', 'disabled' ) );
        }

        if ( props.isReadOnly || props.isReadOnlyButton )
        {
            throw new Error( ERR.PASS_ERR( 'clickIcon', 'read only' ) );
        }

        this.wrapper.find( IconButton ).simulate( 'click' );
        return this;
    }

    mouseOverIcon()
    {
        this.wrapper.find( Tooltip ).driver().mouseOver();
        return this;
    }

    mouseOutIcon()
    {
        this.wrapper.find( Tooltip ).driver().mouseOut();
        return this;
    }
}
