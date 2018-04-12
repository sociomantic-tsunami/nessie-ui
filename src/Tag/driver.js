export default class TagDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    clickClose()
    {
        this.wrapper.find( `.${this.wrapper.props().cssMap.delete}` ).first()
            .simulate( 'click' );
        return this;
    }
}
