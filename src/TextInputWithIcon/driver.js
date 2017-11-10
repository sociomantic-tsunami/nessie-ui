import InputComponentDriver from '../Testing/CommonDrivers/inputComponentDriver';
import { IconWithTooltip }  from 'nessie';

export default class TextInputWithIconDriver extends InputComponentDriver
{
    getErrorMessage()
    {
        const iconWithTooltip = this.wrapper.children()
                                    .filter( IconWithTooltip );
        return iconWithTooltip.driver().getMessage();
    }

    getIconTooltipMessage()
    {
        // TODO: getIconTooltipMessage
        throw new Error( 'Not implemented yet.' );
    }
}
