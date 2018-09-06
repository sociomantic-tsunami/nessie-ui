/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

export default class TextDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.prop( 'cssMap' );
    }

    getContent()
    {
        if ( this.wrapper.prop( 'children' ) )
        {
            return this.wrapper.find( `.${this.cssMap.default}` ).children();
        }

        return this.wrapper.find( `.${this.cssMap.default}` ).text();
    }
}
