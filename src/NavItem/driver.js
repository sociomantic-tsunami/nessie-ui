import { NavItem, NavDropdown } from 'nessie-ui';

import SimpleComponentDriver
    from '../Testing/CommonDrivers/simpleComponentDriver';

export default class NavItemDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.prop( 'cssMap' ).default}` );
    }

    click()
    {
        return this.wrapper.find( `.${this.cssMap.link}` ).first()
            .simulate( 'click' );
    }

    getLabel()
    {
        return this.wrapper.find( `.${this.cssMap.link} span` ).first()
            .children();
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
