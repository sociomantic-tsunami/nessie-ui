/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { InputField } from 'nessie-ui';

const ERR = {
    TEXTAREA_ERR : ( event, state ) =>
        `TextArea cannot simulate ${event} since it is ${state}`,
};

export default class TextAreaDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'blur', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'blur', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().blur();
        return this;
    }

    click()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'click', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'click', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().click();
        return this;
    }

    change( val, input = 'textarea' )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'change', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().change( val, input );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'focus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'focus', 'read only' ) );
        }

        this.wrapper.find( InputField ).driver().focus();
        return this;
    }

    keyPress()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERR( 'keyPress', 'disabled' ) );
        }

        this.wrapper.find( InputField ).driver().keyPress();
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
