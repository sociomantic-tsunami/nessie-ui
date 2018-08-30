import { Slider } from '../index';

export default class SliderGroupDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
    }

    change(  val, index = 0  )
    {
        this.wrapper.find( Slider ).driver().change( val, index );
        return this;
    }
}
