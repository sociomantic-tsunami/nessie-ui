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

export default class DatePickerDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.prop( 'cssMap' );
    }

    clickItem( index = 0 )
    {
        const dateItem = this.wrapper.find( 'DatePickerItem' ).at( index );

        if ( dateItem.prop( 'isDisabled' ) )
        {
            throw new Error(
                ERRORS.OPTION_CANNOT_BE_CLICKED()
            );
        }

        this.wrapper.find( 'DatePickerItem' ).at( index )
            .simulate( 'click' );
        return this;
    }

    clickPrev()
    {
        const header = this.wrapper.find( 'DatePickerHeader' ).props();

        if ( header.prevIsDisabled )
        {
            throw new Error(
                ERRORS.OPTION_CANNOT_BE_CLICKED()
            );
        }

        this.wrapper.find( 'IconButton' ).first()
            .simulate( 'click' );
        return this;
    }

    clickNext()
    {
        const header = this.wrapper.find( 'DatePickerHeader' ).props();

        if ( header.nextIsDisabled )
        {
            throw new Error(
                ERRORS.OPTION_CANNOT_BE_CLICKED()
            );
        }

        this.wrapper.find( 'IconButton' ).last()
            .simulate( 'click' );
        return this;
    }
}
