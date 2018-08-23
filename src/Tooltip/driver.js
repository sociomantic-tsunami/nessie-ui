import { IconButton } from '../index';

const ERR = {
    TOOLTIP_ERR : ( onEvent, state ) =>
        `Tooltip cannot ${onEvent} since it is ${state}`,
};

export default class TooltipDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
    }

    clickClose()
    {
        if ( !this.wrapper.props().isDismissible )
        {
            throw new Error( ERR
                .TOOLTIP_ERR( 'onClickClose', 'not dismissable' ) );
        }

        this.wrapper.find( IconButton ).driver().click();
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
