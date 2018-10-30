/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { IconButton, InputField, ListBox, ScrollBox } from 'nessie-ui';

export default class ComboBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    blur()
    {
        this.wrapper.find( InputField ).driver().blur();
        return this;
    }

    changeInput( val )
    {
        this.wrapper.find( InputField ).driver().change( val );
        return this;
    }

    clickIcon()
    {
        this.wrapper.find( IconButton ).driver().click();
        return this;
    }

    clickInput()
    {
        this.wrapper.find( InputField ).driver().click();
        return this;
    }

    clickOption( index = 0 )
    {
        this.wrapper.find( ListBox ).driver().clickOption( index );
        return this;
    }

    focus()
    {
        this.wrapper.find( InputField ).driver().focus();
        return this;
    }

    keyPress( keyCode )
    {
        this.wrapper.find( InputField ).driver().keyPress( keyCode );
        return this;
    }

    keyDown( keyCode )
    {
        this.wrapper.find( InputField ).driver().keyDown( keyCode );
        return this;
    }

    keyUp( keyCode )
    {
        this.wrapper.find( InputField ).driver().keyUp( keyCode );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOutOption( index = 0 )
    {
        this.wrapper.find( ListBox ).driver().mouseOutOption( index );
        return this;
    }

    mouseOverOption( index = 0 )
    {
        this.wrapper.find( ListBox ).driver().mouseOverOption( index );
        return this;
    }

    scroll( offset = 0 )
    {
        this.wrapper.find( ScrollBox ).driver().scrollVertical( offset );
        return this;
    }
}
