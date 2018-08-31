import { TextInputWithIcon } from 'nessie-ui';

import InputComponentDriver
    from '../Testing/CommonDrivers/inputComponentDriver';

export default class PasswordInput extends InputComponentDriver
{
    getErrorMessage()
    {
        return this.wrapper.find( TextInputWithIcon ).driver()
            .getErrorMessage();
    }
}
