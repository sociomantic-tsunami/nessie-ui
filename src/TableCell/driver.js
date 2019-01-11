/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { Sorter } from 'nessie-ui';

const ERRORS = {
    TABLECELL_CANNOT_TOGGLE : () =>
        'TableCell cannot be toggled since it\'s not sortable',
};

export default class TableCellDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    toggle()
    {
        if ( !this.wrapper.props().isSortable )
        {
            throw new Error( ERRORS.TABLECELL_CANNOT_TOGGLE() );
        }

        this.wrapper.find( Sorter ).driver().click();
        return this;
    }
}
