/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { IconButton }   from 'nessie-ui';

import { createCssMap } from '../Theming';


const ERR = {
    NOT_A_CAROUSEL : item => `Cannot trigger click on the "${item}" because \
the modal is not a Carousel`,
};


export default class ModalDialogDriver
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
            createCssMap( instance.context.ModalDialog, instance.props );
    }

    get overlay()
    {
        return this.wrapper.find( `.${this.cssMap.main}` );
    }

    get closeButton()
    {
        return this.wrapper.find( `.${this.cssMap.header}` ).find( IconButton );
    }

    get prevButton()
    {
        return this.wrapper.find( `.${this.cssMap.navigation}` )
            .find( IconButton ).first();
    }

    get nextButton()
    {
        return this.wrapper.find( `.${this.cssMap.navigation}` )
            .find( IconButton ).last();
    }

    clickOverlay()
    {
        this.overlay.simulate( 'click' );
        return this;
    }

    clickClose()
    {
        if ( this.wrapper.prop( 'type' ) !== 'carousel' )
        {
            throw new Error( ERR.NOT_A_CAROUSEL( 'Close Button' ) );
        }

        this.closeButton.driver().click();
        return this;
    }

    clickPrev()
    {
        if ( this.wrapper.prop( 'type' ) !== 'carousel' )
        {
            throw new Error( ERR.NOT_A_CAROUSEL( 'Prev Button' ) );
        }

        this.prevButton.driver().click();
        return this;
    }

    clickNext()
    {
        if ( this.wrapper.prop( 'type' ) !== 'carousel' )
        {
            throw new Error( ERR.NOT_A_CAROUSEL( 'Next Button' ) );
        }

        this.nextButton.driver().click();
        return this;
    }
}
