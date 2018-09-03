/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import ClickableComponentDriver from '../Testing/CommonDrivers/clickableComponentDriver'; // eslint-disable-line max-len

const ERRORS = {
    BUTTON_CANNOT_BE_CLICKED : ( label, state ) => `Button '${label}' cannot be clicked since it is ${state}` // eslint-disable-line max-len
};

export default class ButtonDriver extends ClickableComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
    }

    click()
    {
        const props = this.wrapper.props();
        const { label } = props;

        if ( props.isDisabled )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_CLICKED( label, 'disabled' ) );
        }
        if ( props.isLoading )
        {
            throw new Error( ERRORS
                .BUTTON_CANNOT_BE_CLICKED( label, 'loading' ) );
        }

        return super.click();
    }
}
