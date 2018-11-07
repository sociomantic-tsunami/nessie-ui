export default class GridColumnDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    getContent()
    {
        return this.wrapper.children();
    }
}
