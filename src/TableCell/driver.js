import { Sorter } from '../index';

const ERRORS = {
    TABLECELL_CANNOT_TOGGLE : () =>
        'TableCell cannot be toggled since it\'s not sortable',
};

export default class TableCellDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
    }

    toggle()
    {
        if ( !this.wrapper.props().isSortable )
        {
            throw new Error( ERRORS.TABLECELL_CANNOT_TOGGLE() );
        }

        this.wrapper.find( Sorter ).driver().click();
        return this;
    }
}
