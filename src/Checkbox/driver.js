/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

const ERR = {
    CHECKBOX_ERR : ( label, event, state ) =>
        `Checkbox '${label}' cannot simulate ${event} since it is ${state}`,
};

export default class CheckboxDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.control = wrapper.find( `.${this.wrapper.props().cssMap.input}` );
    }

    blur()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.labelContent}` )
            .text();

        if ( props.isDisabled )
        {
            throw new Error( ERR.CHECKBOX_ERR( label, 'blur', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.CHECKBOX_ERR( label, 'blur', 'read only' ) );
        }

        this.control.simulate( 'blur' );
        return this;
    }

    focus()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.labelContent}` )
            .text();

        if ( props.isDisabled )
        {
            throw new Error( ERR.CHECKBOX_ERR( label, 'focus', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.CHECKBOX_ERR( label, 'focus', 'read only' ) );
        }

        this.control.simulate( 'focus' );
        return this;
    }

    change()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.labelContent}` )
            .text();
        const node   = this.control.instance();

        if ( props.isDisabled )
        {
            throw new Error( ERR.CHECKBOX_ERR( label, 'change', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.CHECKBOX_ERR( label, 'change', 'read only' ) );
        }

        node.checked = !node.checked;
        this.control.simulate( 'change' );

        return this;
    }

    click()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.labelContent}` )
            .text();

        if ( props.isDisabled )
        {
            throw new Error( ERR.CHECKBOX_ERR( label, 'click', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR.CHECKBOX_ERR( label, 'click', 'read only' ) );
        }

        this.control.simulate( 'click' );
        return this;
    }

    mouseOver()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.labelContent}` )
            .text();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'mouseOver', 'disabled' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.labelContent}` )
            .text();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'mouseOut', 'disabled' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
