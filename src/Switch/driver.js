/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

const ERR = {
    SWITCH_ERR : ( event, state ) =>
        `Switch cannot simulate ${event} since it is ${state}`,
};

export default class SwitchDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.instance().context.Switch;
        this.input   = wrapper.find( `.${this.cssMap.input}` );
    }

    change()
    {
        const node  = this.input.instance();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.SWITCH_ERR( 'change', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.SWITCH_ERR( 'change', 'read only' ) );
        }

        node.checked = !node.checked;
        this.input.simulate( 'change' );

        return this.wrapper;
    }

    blur()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.SWITCH_ERR( 'blur', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.SWITCH_ERR( 'blur', 'read only' ) );
        }

        this.input.simulate( 'blur' );
        return this;
    }

    focus()
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.SWITCH_ERR( 'focus', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.SWITCH_ERR( 'focus', 'read only' ) );
        }

        this.input.simulate( 'focus' );
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
