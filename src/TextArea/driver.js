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

export default class TextAreaDriver extends InputComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, 'textarea' );
    }
}
