/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { IconButton, InputField } from 'nessie-ui';

const ERR = {
    PASS_ERR : ( event, state ) => `PasswordInput cannot simulate ${event} \
since it is ${state}`,
};

export default class PasswordInputDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }


    blur()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.PASS_ERR( 'blur', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().blur();
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.PASS_ERR( 'focus', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().focus();
        return this;
    }

    change( val )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.PASS_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.PASS_ERR( 'change', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().change( val );
        return this;
    }

    keyPress( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.PASS_ERR( 'keyPress', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().keyPress( keyCode );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseOver' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseOut' );
        return this;
    }

    clickIcon()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.PASS_ERR( 'clickIcon', 'disabled' ) );
        }

        this.wrapper.find( IconButton ).driver().click();
        return this;
    }

    mouseOverIcon()
    {
        this.wrapper.find( IconButton ).driver().mouseOver();
        return this;
    }

    mouseOutIcon()
    {
        this.wrapper.find( IconButton ).driver().mouseOut();
        return this;
    }
}
