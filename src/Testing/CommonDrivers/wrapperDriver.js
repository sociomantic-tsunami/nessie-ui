/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

export default class WrapperDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.prop( 'cssMap' );
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.default}` )
            .first().children();
    }
}
