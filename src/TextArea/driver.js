import InputComponentDriver
    from '../Testing/CommonDrivers/inputComponentDriver';

export default class TextAreaDriver extends InputComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, 'textarea' );
    }
}
