/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

export default class IconWithTooltipDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.tooltip = wrapper
            .find( `.${this.wrapper.props().cssMap.iconWithTooltip}` ).first();
    }

    mouseOverIcon()
    {
        this.tooltip.simulate( 'mouseenter' );
        return this;
    }

    mouseOutIcon()
    {
        this.tooltip.simulate( 'mouseleave' );
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
