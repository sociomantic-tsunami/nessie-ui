/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { Checkbox, Radio } from 'nessie-ui';


const ERR = {
    CHECKABLEGROUP_ERR : ( event, state ) => `CheckableGroup cannot simulate \
${event} since it is ${state}`,
};


export default class CheckableGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
        this.checkables = wrapper.find( Checkbox ).length ?
            wrapper.find( Checkbox ) :
            wrapper.find( Radio );
    }

    change( index = 0 )
    {
        const props = this.wrapper.props();

        if ( props.isDisabled )
        {
            throw new Error( ERR
                .CHECKABLEGROUP_ERR( 'change', 'disabled' ) );
        }

        if ( props.isReadOnly )
        {
            throw new Error( ERR
                .CHECKABLEGROUP_ERR( 'change', 'read only' ) );
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
