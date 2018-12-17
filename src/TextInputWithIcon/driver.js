/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { IconButton, InputField, Tooltip } from 'nessie-ui';

export default class TextInputWithIconDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
    }

    change( val )
    {
        this.wrapper.find( InputField ).driver().change( val );
        return this;
    }

    click()
    {
        this.wrapper.find( InputField ).driver().click();
        return this;
    }

    keyDown( keyCode )
    {
        this.wrapper.find( InputField ).driver().keyDown( keyCode );
        return this;
    }

    keyPress( keyCode )
    {
        this.wrapper.find( InputField ).driver().keyPress( keyCode );
        return this;
    }

    keyUp( keyCode )
    {
        this.wrapper.find( InputField ).driver().keyUp( keyCode );
        return this;
    }

    focus()
    {
        this.wrapper.find( InputField ).driver().focus();
        return this;
    }

    blur()
    {
        this.wrapper.find( InputField ).driver().blur();
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
        this.wrapper.find( IconButton ).driver().click();
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
