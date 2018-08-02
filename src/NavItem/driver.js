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

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
