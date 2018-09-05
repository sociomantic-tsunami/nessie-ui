/*
 * Copyright (c) 2017 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { TextInputWithIcon } from 'nessie-ui';

import InputComponentDriver
    from '../Testing/CommonDrivers/inputComponentDriver';

export default class PasswordInput extends InputComponentDriver
{
    getErrorMessage()
    {
        const textInputWithIcon = this.wrapper.find( TextInputWithIcon );
        return textInputWithIcon.driver().getErrorMessage();
    }
}
