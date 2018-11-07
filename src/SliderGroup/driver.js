/*
 * Copyright (c) 2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

export default class SliderGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    getSlider( index = 0 )
    {
        if ( Array.isArray( index ) )
        {
            const sliders = [];
            this.wrapper.find( 'Slider' ).map( ( item, i ) =>
            {
                if ( index.includes( i ) )
                {
                    sliders.push( item );
                }
            } );

            return sliders;
        }

        return this.wrapper.find( 'Slider' ).at( index );
    }
}
