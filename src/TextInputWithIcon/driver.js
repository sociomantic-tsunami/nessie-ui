import { IconWithTooltip } from 'nessie-ui';

import InputComponentDriver from
    '../Testing/CommonDrivers/inputComponentDriver';


export default class TextInputWithIconDriver extends InputComponentDriver
{
    getErrorMessage()
    {
        return this.wrapper.find( IconWithTooltip ).first().driver()
            .getMessage();
    }

    getIconTooltipMessage()
    {
        // TODO: getIconTooltipMessage
        throw new Error( 'Not implemented yet.' );
    }
}
