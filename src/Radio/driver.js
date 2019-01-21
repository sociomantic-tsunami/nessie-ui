/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

const ERR = {
    RADIO_ERR : ( label, event, state ) =>
        `Radio '${label}' cannot simulate ${event} since it is ${state}`,
};

export default class RadioDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.children().instance().context.Radio;
        this.control = wrapper.find( `.${this.cssMap.input}` );
    }

    blur()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.RADIO_ERR( label, 'blur', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.RADIO_ERR( label, 'blur', 'read only' ) );
        }

        this.control.simulate( 'blur' );
        return this;
    }

    focus()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.RADIO_ERR( label, 'focus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.RADIO_ERR( label, 'focus', 'read only' ) );
        }

        this.control.simulate( 'focus' );
        return this;
    }

    change()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();
        const node  = this.control.instance();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.RADIO_ERR( label, 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.RADIO_ERR( label, 'change', 'read only' ) );
        }

        if ( node.checked !== true )
        {
            node.checked = true;
            this.control.simulate( 'change' );
            return this;
        }

        return this;
    }

    click()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.RADIO_ERR( label, 'click', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.RADIO_ERR( label, 'click', 'read only' ) );
        }

        this.control.simulate( 'click' );
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
