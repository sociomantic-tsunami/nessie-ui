/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import InputComponentDriver from '../Testing/CommonDrivers/inputComponentDriver';
import { IconWithTooltip }  from 'nessie-ui';

export default class TextInputWithIconDriver extends InputComponentDriver
{
    getErrorMessage()
    {
        const iconWithTooltip = this.wrapper.find( IconWithTooltip ).first();
        return iconWithTooltip.driver().getMessage();
    }

    getIconTooltipMessage()
    {
        // TODO: getIconTooltipMessage
        throw new Error( 'Not implemented yet.' );
    }
}
