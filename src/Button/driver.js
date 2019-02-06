/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { createCssMap } from '../Theming';


const ERR = {
    BUTTON_ERR : ( label, event, state ) =>
        `Button '${label}' cannot simulate ${event} since it is ${state}`,
};


export default class ButtonDriver
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
            createCssMap( instance.context.Button, instance.props );
    }

    get button()
    {
        return this.wrapper.find( `.${this.cssMap.main}` ).first();
    }


    click()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'click', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'click', 'read only' ) );
        }

        if ( this.wrapper.props().isLoading )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'click', 'loading' ) );
        }

        this.button.simulate( 'click' );
        return this;
    }

    mouseOver()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'mouseOver', 'disabled' ) );
        }

        if ( this.wrapper.props().isLoading )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'mouseOver', 'loading' ) );
        }

        this.button.simulate( 'mouseOver' );
        return this;
    }

    mouseOut()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'mouseOut', 'disabled' ) );
        }

        if ( this.wrapper.props().isLoading )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'mouseOut', 'loading' ) );
        }

        this.button.simulate( 'mouseOut' );
        return this;
    }
}
