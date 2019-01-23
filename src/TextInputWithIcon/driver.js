/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { IconButton, TextInput } from 'nessie-ui';


export default class TextInputWithIconDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
    }

    change( val )
    {
        this.wrapper.find( TextInput ).driver().change( val );
        return this;
    }

    click()
    {
        this.wrapper.find( TextInput ).driver().click();
        return this;
    }

    keyDown( keyCode )
    {
        this.wrapper.find( TextInput ).driver().keyDown( keyCode );
        return this;
    }

    keyPress( keyCode )
    {
        this.wrapper.find( TextInput ).driver().keyPress( keyCode );
        return this;
    }

    keyUp( keyCode )
    {
        this.wrapper.find( TextInput ).driver().keyUp( keyCode );
        return this;
    }

    focus()
    {
        this.wrapper.find( TextInput ).driver().focus();
        return this;
    }

    blur()
    {
        this.wrapper.find( TextInput ).driver().blur();
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
