/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

export default class SimpleComponentDriver
{
    constructor( wrapper, selector )
    {
        this.wrapper = wrapper;
        this.control = wrapper.find( selector ).first();
        this.cssMap = this.wrapper.prop( 'cssMap' );
    }

    blur()
    {
        this.control.simulate( 'blur' );
        return this;
    }

    focus()
    {
        this.control.simulate( 'focus' );
        return this;
    }

    mouseOut()
    {
        this.control.simulate( 'mouseleave' );
        return this;
    }

    mouseOver()
    {
        this.control.simulate( 'mouseenter' );
        return this;
    }
}
