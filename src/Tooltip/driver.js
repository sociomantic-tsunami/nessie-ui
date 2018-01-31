import SimpleComponentDriver from '../Testing/CommonDrivers/simpleComponentDriver'; // eslint-disable-line max-len

const ERRORS = {
    TOOLTIP_HAS_NO_CONTENT : ( action ) =>
        `Cannot ${action} on tooltip. No content available`
};
/**
 * This driver simulate actions on the content rather than on the tooltip
 * itself, as this is how a user would act.
 */
export default class TooltipDriver extends SimpleComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.content}` );
    }

    mouseOver()
    {
        checkContentAccessiblity( this, 'mouseover' );
        return super.mouseOver();
    }

    mouseOut()
    {
        checkContentAccessiblity( this, 'mouseout' );
        return super.mouseOut();
    }

    getContent()
    {
        return this.control.children();
    }

    getMessage()
    {
        return this.wrapper.find( `.${this.cssMap.message}` ).children();
    }
}

function checkContentAccessiblity( driver, method )
{
    if ( driver.control.length === 0 )
    {
        throw new Error( ERRORS.TOOLTIP_HAS_NO_CONTENT( method ) );
    }
}
