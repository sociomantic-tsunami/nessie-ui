export default class TagDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
    }

    clickClose()
    {
        this.wrapper.find( `.${this.cssMap.delete}` ).simulate( 'click' );
        return this;
    }
}
