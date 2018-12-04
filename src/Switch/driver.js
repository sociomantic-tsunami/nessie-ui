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
        this.cssMap  = wrapper.props().cssMap;
        this.input   = wrapper.find( `.${wrapper.props().cssMap.input}` );
    }

    change()
    {
        const props = this.wrapper.props();
        const node  = this.input.getNode();

        if ( props.isDisabled )
        {
            throw new Error( ERR.SWITCH_ERR( 'change', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.SWITCH_ERR( 'change', 'read only' ) );
        }

        node.checked = !node.checked;
        this.input.simulate( 'change' );

        return this.wrapper;
    }

    blur()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR.SWITCH_ERR( 'blur', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.SWITCH_ERR( 'blur', 'read only' ) );
        }

        this.input.simulate( 'blur' );
        return this;
    }

    focus()
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR.SWITCH_ERR( 'focus', 'disabled' ) );
        }

        if ( props.isReadOnly )
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
