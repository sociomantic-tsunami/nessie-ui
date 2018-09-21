/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

export default class PaginatorDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
    }

    clickPrev()
    {
        this.wrapper.find( `.${this.cssMap.arrows}` )
            .first().simulate( 'click' );
        return this;
    }

    clickNext()
    {
        this.wrapper.find( `.${this.cssMap.arrows}` )
            .last().simulate( 'click' );
        return this;
    }

    clickPage( i = 0 )
    {
        this.wrapper.find( `.${this.cssMap.pageButton}` )
            .at( i ).simulate( 'click' );
        return this;
    }
}
