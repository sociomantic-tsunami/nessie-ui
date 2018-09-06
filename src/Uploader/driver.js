/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { Button, IconButton } from '../index';

const ERR = {
    UPLOADER_ERR : ( event, state ) =>
        `Uploader cannot simulate ${event} since it is ${state}`,
};

export default class UploaderDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
    }

    click()
    {
        this.wrapper.find( Button ).first().driver().click();
        return this;
    }

    clickSecondary()
    {
        this.wrapper.find( IconButton ).first().driver().click();
        return this;
    }

    change( val )
    {
        const node = this.wrapper.find( `.${this.cssMap.input}` ).getNode();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.UPLOADER_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.UPLOADER_ERR( 'change', 'read only' ) );
        }

        node.name = val;
        this.wrapper.find( `.${this.cssMap.input}` ).simulate( 'change' );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
