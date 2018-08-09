export default class SliderGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
    }

    change(  val = '0', index = 0  )
    {
        this.wrapper.find( 'Slider' ).driver().change( val, index );
        return this;
    }
}
