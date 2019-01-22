/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

const ERR = {
    ICONBUTTON_ERR : ( label, event, state ) =>
        `Button '${label}' cannot simulate ${event} since it is ${state}`,
};

export default class IconButtonDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    click()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .ICONBUTTON_ERR( label, 'click', 'disabled' ) );
        }

        this.wrapper.simulate( 'click' );
        return this;
    }

    mouseOver()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .ICONBUTTON_ERR( label, 'mouseOver', 'disabled' ) );
        }

        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .ICONBUTTON_ERR( label, 'mouseOut', 'disabled' ) );
        }

        this.wrapper.simulate( 'mouseleave' );
        return this;
    }

    focus()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR.ICONBUTTON_ERR( label, 'focus', 'disabled' ) );
        }

        this.wrapper.simulate( 'focus' );
        return this;
    }

    blur()
    {
        const props     = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERR.ICONBUTTON_ERR( label, 'blur', 'disabled' ) );
        }

        this.wrapper.simulate( 'blur' );
        return this;
    }
}
