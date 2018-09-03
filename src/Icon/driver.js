/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

// eslint-disable-next-line max-len
import SimpleComponentDriver from '../Testing/CommonDrivers/simpleComponentDriver';

export default class IconDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
        this.button = this.control;
    }
}
