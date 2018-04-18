export default class DatePickerDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = this.wrapper.props().cssMap;
    }
}
