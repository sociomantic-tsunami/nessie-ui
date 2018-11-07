import SimpleComponentDriver from './simpleComponentDriver';

export default class ClickableComponentDriver extends SimpleComponentDriver
{
    click()
    {
        this.control.simulate( 'click' );
        return this;
    }
}
