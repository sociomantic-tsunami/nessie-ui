import ClickableComponentDriver from '../Testing/CommonDrivers/clickableComponentDriver'; // eslint-disable-line max-len

const ERRORS = {
    BUTTON_CANNOT_BE_CLICKED : ( label, state ) => `Button '${label}' cannot be clicked since it is ${state}` // eslint-disable-line max-len
};

export default class ButtonDriver extends ClickableComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, `.${wrapper.props().cssMap.default}` );
    }

    click()
    {
        const props = this.wrapper.props();
        const label = props.label;

        if ( props.isDisabled )
        {
            throw new Error(
                ERRORS.BUTTON_CANNOT_BE_CLICKED( label, 'disabled' )
            );
        }
        if ( props.isLoading )
        {
            throw new Error(
                ERRORS.BUTTON_CANNOT_BE_CLICKED( label, 'loading' )
            );
        }

        return super.click();
    }
}
