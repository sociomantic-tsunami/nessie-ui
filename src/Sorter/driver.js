export default class SorterDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    click()
    {
        this.wrapper.simulate( 'click' );
        return this;
    }
}
