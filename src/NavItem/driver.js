import { NavItem, NavDropdown } from 'nessie-ui';

export default class NavItemDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
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
