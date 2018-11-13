/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import ListBoxOption from './ListBoxOption';

export default class ListBoxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickOption( index = 0 )
    {
        const option = this.wrapper.find( ListBoxOption ).at( index );

        option.simulate( 'click' );
        return this;
    }

    mouseOverOption( index = 0 )
    {
        const option = this.wrapper.find( ListBoxOption ).at( index );

        option.simulate( 'mouseenter' );
        return this;
    }

    mouseOutOption( index = 0 )
    {
        const option = this.wrapper.find( ListBoxOption ).at( index );

        option.simulate( 'mouseleave' );
        return this;
    }

    keyPress( keyCode )
    {
        this.wrapper.simulate( 'keyPress', { which: keyCode } );
        return this;
    }
}
