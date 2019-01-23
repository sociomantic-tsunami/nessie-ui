/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { createCssMap } from '../Theming';


const ERR = {
    CHECKBOX_ERR : ( label, event, state ) =>
        `Checkbox '${label}' cannot simulate ${event} since it is ${state}`,
};


export default class CheckboxDriver
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
            createCssMap( instance.context.Checkbox, instance.props );
    }

    get control()
    {
        return this.wrapper.find( `.${this.cssMap.input}` );
    }


    blur()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.CHECKBOX_ERR( label, 'blur', 'disabled' ) );
        }

        this.control.simulate( 'blur' );
        return this;
    }

    focus()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.CHECKBOX_ERR( label, 'focus', 'disabled' ) );
        }

        this.control.simulate( 'focus' );
        return this;
    }

    change()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();
        const node = this.wrapper.find( `.${this.cssMap.input}` ).instance();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.CHECKBOX_ERR( label, 'change', 'disabled' ) );
        }

        node.checked = !node.checked;
        this.control.simulate( 'change' );

        return this;
    }

    click()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.CHECKBOX_ERR( label, 'click', 'disabled' ) );
        }

        this.control.simulate( 'click' );
        return this;
    }

    mouseOver()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'mouseOver', 'disabled' ) );
        }

        this.wrapper.simulate( 'mouseover' );
        return this;
    }

    mouseOut()
    {
        const label = this.wrapper.find( `.${this.cssMap.label}` ).text();

        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR
                .CHECKBOX_ERR( label, 'mouseOut', 'disabled' ) );
        }

        this.wrapper.simulate( 'mouseout' );
        return this;
    }
}
