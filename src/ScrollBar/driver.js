export default class ScrollBarDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickTrack( val )
    {
        this.wrapper.prop( 'onClickTrack' )( val );
        return this;
    }

    change( val )
    {
        this.wrapper.prop( 'onChange' )( val );
        return this;
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
