/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { createCssMap } from '../Theming';


export default class ModalDriver
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
            createCssMap( instance.context.Modal, instance.props );
    }

    get overlay()
    {
        return this.wrapper.find( `.${this.cssMap.main}` );
    }

    clickOverlay()
    {
        this.overlay.simulate( 'click' );
        return this;
    }
}
