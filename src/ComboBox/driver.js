/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { InputField, ListBox, ScrollBox } from 'nessie-ui';

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

    changeInput()
    {
        this.wrapper.find( InputField ).driver().pressKey( 'c' );
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

    keyPress( string )
    {
        this.wrapper.find( InputField ).driver().pressKey( string );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }

    mouseOutOption( index = 0 )
    {
        this.wrapper.find( ListBox ).driver().mouseOutOption( index );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
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
