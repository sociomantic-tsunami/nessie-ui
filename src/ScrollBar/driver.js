/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

export default class ScrollBarDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickTrack( val )
    {
        this.wrapper.prop( 'onClickTrack' )( val );
        return this;
    }

    change( val )
    {
        this.wrapper.prop( 'onChange' )( val );
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
}
