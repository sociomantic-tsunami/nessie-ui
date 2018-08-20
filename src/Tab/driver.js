export default class TabDriver
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
