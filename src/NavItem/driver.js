/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { NavItem, NavDropdown } from 'nessie-ui';

import SimpleComponentDriver
    from '../Testing/CommonDrivers/simpleComponentDriver';

export default class NavItemDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
    }

    click()
    {
        return this.wrapper.find( `.${this.cssMap.link}` )
            .first().simulate( 'click' );
    }

    getLabel()
    {
        return this.wrapper.find( `.${this.cssMap.link} span` )
            .first().children();
    }

    getChildNavItems()
    {
        const dropdown = this.wrapper.find( NavDropdown );
        if ( dropdown.length !== 1 )
        {
            return [];
        }

        return dropdown.children( NavItem );
    }
}
