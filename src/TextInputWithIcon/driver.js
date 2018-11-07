import InputComponentDriver from '../Testing/CommonDrivers/inputComponentDriver';
import { IconWithTooltip }  from 'nessie-ui';

export default class TextInputWithIconDriver extends InputComponentDriver
{
    getErrorMessage()
    {
        const iconWithTooltip = this.wrapper.find( IconWithTooltip ).first();
        return iconWithTooltip.driver().getMessage();
    }

    getIconTooltipMessage()
    {
        // TODO: getIconTooltipMessage
        throw new Error( 'Not implemented yet.' );
    }
}
