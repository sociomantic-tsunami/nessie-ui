export default class ScrollBarDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap = wrapper.props().cssMap;

        this.thumb = wrapper.find( `.${this.cssMap.thumb}` );
        this.track = wrapper.find( `.${this.cssMap.default}` );
    }

    clickTrack()
    {
        this.track.simulate( 'click' );
        return this;
    }

    mouseDownThumb()
    {
        this.thumb.simulate( 'mousedown' );
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
