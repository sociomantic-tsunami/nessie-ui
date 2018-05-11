import InputComponentDriver
    from '../Testing/CommonDrivers/inputComponentDriver';

export default class TagInputDriver extends InputComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper );
        this.wrapper = wrapper;
    }

    clickClose()
    {
        this.wrapper.find( 'Tag' ).first().driver().clickClose();
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }
}
