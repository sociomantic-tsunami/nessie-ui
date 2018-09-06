/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

export default class CheckableGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    getContent()
    {
        const items = this.wrapper.find( 'li' );
        return items.map( item => item.childAt( 0 ) );
    }

    selectByIndex( index = 0 )
    {
        const items = this.getContent();

        if ( Array.isArray( index ) )
        {
            index.forEach( i =>
            {
                items[ i ].driver().setChecked();
            } );
        }
        else
        {
            items[ index ].driver().setChecked();
        }

        return this;
    }

    selectByValue( value )
    {
        if ( Array.isArray( value ) )
        {
            value.forEach( i =>
            {
                const item =
                    this.wrapper.findWhere( n =>
                        n.prop( 'value' ) === i ).first();
                item.driver().setChecked();
            } );
        }
        else
        {
            const item =
                this.wrapper.findWhere( n =>
                    n.prop( 'value' ) === value ).first();
            item.driver().setChecked();
        }

        return this;
    }

    toggleByIndex( index = 0 )
    {
        const items = this.getContent();

        if ( Array.isArray( index ) )
        {
            index.forEach( i =>
            {
                items[ i ].driver().toggleChecked();
            } );
        }
        else
        {
            items[ index ].driver().toggleChecked();
        }

        return this;
    }

    toggleByValue( value )
    {
        if ( Array.isArray( value ) )
        {
            value.forEach( i =>
            {
                const item =
                    this.wrapper.findWhere( n =>
                        n.prop( 'value' ) === i ).first();
                item.driver().toggleChecked();
            } );
        }
        else
        {
            const item =
                this.wrapper.findWhere( n =>
                    n.prop( 'value' ) === value ).first();
            item.driver().toggleChecked();
        }

        return this;
    }

    getSelectedValues()
    {
        const items = this.wrapper.findWhere( n =>
            n.instance() && n.instance().checked === true );

        return items.map( item => item.prop( 'value' ) );
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
