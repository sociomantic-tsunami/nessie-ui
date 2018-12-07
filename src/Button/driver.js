/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */


const ERR = {
    BUTTON_ERR : ( label, event, state ) =>
        `Button '${label}' cannot simulate ${event} since it is ${state}`,
};

export default class ButtonDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
        this.button  = wrapper.find( `.${this.cssMap.default}` ).first();
    }

    click()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( props.isDisabled )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'click', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'click', 'read only' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'click', 'loading' ) );
        }

        this.button.simulate( 'click' );
        return this;
    }

    mouseOver()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( props.isDisabled )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'mouseOver', 'disabled' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'mouseOver', 'loading' ) );
        }

        this.button.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( props.isDisabled )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'mouseOut', 'disabled' ) );
        }

        if ( props.isLoading )
        {
            throw new Error( ERR.BUTTON_ERR( label, 'mouseOut', 'loading' ) );
        }

        this.button.simulate( 'mouseleave' );
        return this;
    }
}
