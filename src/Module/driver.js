/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable valid-jsdoc, no-magic-numbers */
import { IconButton, IconWithTooltip } from 'nessie-ui';

/* eslint-disable max-len */
const ERR = {
    MODULE_NOT_COLLAPSIBLE : 'Module is not collapsible. Cannot simulate toggle.',
    MODULE_HAS_NO_DELETE   : 'Module has no delete button. Cannot simulate delete.',
};

export default class ModuleDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
    }

    /**
     * Simulate human toggle by clicking on the arrow.
     */
    clickToggle()
    {
        const toggle = this.wrapper.find( IconButton )
            .findWhere( node => [ 'up', 'down' ]
                .includes( node.props().iconType ) );

        if ( toggle.length === 0 )
        {
            throw new Error( ERR.MODULE_NOT_COLLAPSIBLE );
        }

        toggle.driver().click();
        return this.wrapper;
    }

    /**
     * Simulate clicking on the module's delete button (if applicable)
     */
    clickDelete()
    {
        const deleteButton = this.wrapper.find( IconButton )
            .findWhere( node => node.props().iconType === 'delete' );

        if ( !this.wrapper.prop( 'isDeletable' ) )
        {
            throw new Error( ERR.MODULE_HAS_NO_DELETE );
        }

        deleteButton.driver().click();
        return this.wrapper;
    }

    mouseOverHeader()
    {
        this.wrapper.find( `.${this.cssMap.header}` ).simulate( 'mouseOver' );
        return this;
    }

    mouseOutHeader()
    {
        this.wrapper.find( `.${this.cssMap.header}` ).simulate( 'mouseOut' );
        return this;
    }

    mouseOverError()
    {
        this.wrapper.find( IconWithTooltip ).driver().mouseOver();
        return this;
    }

    mouseOutError()
    {
        this.wrapper.find( IconWithTooltip ).driver().mouseOut();
        return this;
    }
}
