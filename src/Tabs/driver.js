/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

export default class TabsDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    getTabButtons()
    {
        return this.wrapper.find( 'TabButton' );
    }

    getTabButtonsByIndex( index = 0 )
    {
        if ( Array.isArray( index ) )
        {
            const tabButtons = [];

            index.forEach( i =>
            {
                tabButtons.push( index[ i ] );
            } );

            return tabButtons;
        }

        return this.wrapper.find( 'TabButton' ).at( index );
    }

    getTabButtonsByLabel( label )
    {
        return this.wrapper.findWhere( n =>
            n.prop( 'label' ) === label ).first();
    }

    getTabContent()
    {
        return this.wrapper.find( 'Tab' ).driver().getContent();
    }
}
