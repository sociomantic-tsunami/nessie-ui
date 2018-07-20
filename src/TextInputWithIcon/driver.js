import { IconWithTooltip }  from 'nessie-ui';

import InputComponentDriver
    from '../Testing/CommonDrivers/inputComponentDriver';

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
