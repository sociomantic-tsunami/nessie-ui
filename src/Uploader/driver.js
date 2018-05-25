export default class UploaderDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    click()
    {
        this.wrapper.find( 'Button' ).simulate( 'click' );
        return this;
    }

    clickSecondary()
    {
        this.wrapper.find( 'IconButton' ).simulate( 'click' );
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
