/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { Checkbox, Radio } from '../index';


const ERR = {
    CHECKABLEGROUP_ERR : ( label, event, state ) => `CheckableGroup \
'${label}' cannot simulate ${event} since it is ${state}`,
};


export default class CheckableGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
        this.cssMap     = wrapper.props().cssMap;
        this.checkables = wrapper.find( Checkbox ).length ?
            wrapper.find( Checkbox ) :
            wrapper.find( Radio );
    }

    change( index = 0 )
    {
        const props = this.wrapper.props();
        const label = this.wrapper.find( `.${props.cssMap.list}` ).text();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CHECKABLEGROUP_ERR( label, 'change', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CHECKABLEGROUP_ERR( label, 'change', 'read only' ) );
        }


        this.checkables.at( index ).driver().change();
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
