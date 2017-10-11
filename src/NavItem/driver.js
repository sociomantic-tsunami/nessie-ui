// eslint-disable-next-line max-len
import ClickableComponentDriver
    from '../Testing/CommonDrivers/clickableComponentDriver';
import { NavItem, NavDropdown } from 'nessie';
export default class NavItemDriver extends ClickableComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.link}` );
    }

    getLabel()
    {
        return this.wrapper.find( `.${this.cssMap.link} div` )
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
