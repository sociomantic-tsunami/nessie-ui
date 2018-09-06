/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

const ERRORS = {
    CANNOT_BE_CLICKED : () => 'Button cannot be clicked because it is disabled'
};

export default class TabButtonDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    click()
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error(
                ERRORS.CANNOT_BE_CLICKED()
            );
        }

        return this.wrapper.simulate( 'click' );
    }
}
