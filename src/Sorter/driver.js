export default class SorterDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    toggle()
    {
        this.wrapper.simulate( 'click' );
        return this;
    }
}
