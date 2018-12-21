/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { Button, IconButton } from 'nessie-ui';

import { createCssMap }       from '../Theming';


const ERR = {
    UPLOADER_ERR : ( event, state ) =>
        `Uploader cannot simulate ${event} since it is ${state}`,
};


export default class UploaderDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    get instance()
    {
        return this.wrapper.instance();
    }

    get cssMap()
    {
        const { instance } = this;
        return instance.props.cssMap ||
            createCssMap( instance.context.Uploader, instance.props );
    }


    click()
    {
        this.wrapper.find( Button ).driver().click();
        return this;
    }

    clickSecondary()
    {
        this.wrapper.find( IconButton ).first().driver().click();
        return this;
    }

    change( val )
    {
        const node = this.wrapper.find( `.${this.cssMap.input}` ).instance();

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
