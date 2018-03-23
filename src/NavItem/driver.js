// eslint-disable-next-line max-len
import ClickableComponentDriver
    from '../Testing/CommonDrivers/clickableComponentDriver';
import { NavItem, NavDropdown } from 'nessie-ui';
export default class NavItemDriver extends ClickableComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
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

    click()
    {
        this.control.find( `.${this.cssMap.link}` ).simulate( 'click' );
        return this;
    }
}
