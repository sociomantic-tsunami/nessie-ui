export default class DateTimeInputDriver
{
    constructor( wrapper )
    {
        this.wrapper    = wrapper;
        this.cssMap     = wrapper.props().cssMap;
        this.inputValue = wrapper.props().inputValue;
    }

    getMainInputValue()
    {
        return this.inputValue;
    }
}
