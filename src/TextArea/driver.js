/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

const ERR = {
    TEXTAREA_ERROR : ( event, state ) =>
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
            throw new Error( ERR.TEXTAREA_ERROR( 'blur', 'disabled' ) );
        }

        this.wrapper.simulate( 'blur' );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERROR( 'focus', 'disabled' ) );
        }

        this.wrapper.simulate( 'focus' );
        return this;
    }

    change( val, textarea = 'textarea' )
    {
        const node = this.wrapper.find( textarea ).instance();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERROR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.TEXTAREA_ERROR( 'change', 'read only' ) );
        }

        node.value = val;
        this.wrapper.simulate( 'change' );

        return this;
    }

    click()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERROR( 'click', 'disabled' ) );
        }

        this.wrapper.simulate( 'click' );
        return this;
    }

    keyPress( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERROR( 'keyPress', 'disabled' ) );
        }

        this.wrapper.simulate( 'keyPress', { keyCode, which: keyCode } );
        return this;
    }

    keyDown( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERROR( 'keyDown', 'disabled' ) );
        }

        this.wrapper.simulate( 'keyDown', { keyCode, which: keyCode } );
        return this;
    }

    keyUp( keyCode )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.TEXTAREA_ERROR( 'keyUp', 'disabled' ) );
        }

        this.wrapper.simulate( 'keyUp', { keyCode, which: keyCode } );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseover' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseout' );
        return this;
    }
}
