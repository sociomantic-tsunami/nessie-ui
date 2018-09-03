/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import InputComponentDriver
    from '../Testing/CommonDrivers/inputComponentDriver';

export default class CheckboxDriver extends InputComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.input}` );
        this.outer = wrapper.find( `.${wrapper.props().cssMap.default}` );
    }

    setChecked()
    {
        const node = this.control.getNode();

        if ( !node.checked )
        {
            node.checked  = true;
            this.control.simulate( 'change' );
        }

        return this;
    }

    setUnchecked()
    {
        const node = this.control.getNode();

        if ( node.checked )
        {
            node.checked = false;
            this.control.simulate( 'change' );
        }

        return this;
    }

    toggleChecked()
    {
        const node   = this.control.getNode();
        node.checked = !node.checked;
        this.control.simulate( 'change' );
        return this;
    }

    getChecked()
    {
        return this.control.getNode().checked;
    }

    mouseOver()
    {
        this.outer.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.outer.simulate( 'mouseleave' );
        return this;
    }
}
