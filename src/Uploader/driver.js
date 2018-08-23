import { Button, IconButton } from '../index';

const ERR = {
    UPLOADER_ERR : ( onEvent, state ) =>
        `Uploader cannot ${onEvent} since it is ${state}`,
};

export default class UploaderDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
    }

    click()
    {
        this.wrapper.find( Button ).first().driver().click();
        return this;
    }

    clickSecondary()
    {
        this.wrapper.find( IconButton ).first().driver().click();
        return this;
    }

    change( val )
    {
        if ( this.wrapper.props().isDisabled )
        {
            throw new Error( ERR.UPLOADER_ERR( 'onChange', 'disabled' ) );
        }

        if ( this.wrapper.props().isReadOnly )
        {
            throw new Error( ERR.UPLOADER_ERR( 'onChange', 'read only' ) );
        }

        this.wrapper.find( `.${this.cssMap.input}` )
            .simulate( 'change', { target: { value: val } } );
        return this;
    }

    mouseOver()
    {
        this.wrapper.simulate( 'mouseenter' );
        return this;
    }

    mouseOut()
    {
        this.wrapper.simulate( 'mouseleave' );
        return this;
    }
}
