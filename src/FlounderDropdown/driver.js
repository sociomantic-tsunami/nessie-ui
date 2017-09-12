const ERRORS =
    {
        CANNOT_SELECT_ITEMS : ( byWhat, index ) => `Item(s) not found by \
${byWhat}: ${index}. item(s) cannot selected.`,
        CANNOT_DESELECT_TAGS : 'Cannot deselect tags when flounder dropdown is \
not configured with multipleTags',
        DROPDOWN_DISABLED : 'Cannot change the flounder dropdown value since \
it is disabled',
        DROPDOWN_READ_ONLY : 'Cannot change the flounder dropdown value since \
it is read-only'
    };

/**
 * Driver for flounder dropdown driver. The flounder dropdown uses currently
 * a non React control. This renders Enzyme useless in many cases and a manual
 * approach is used. If the control changes to React please extend
 * InputComponentDriver.
 * When this will happen the following methods could be developed easily:
 * Search, SearchAndChoose (through change text)
 * ToggleDropdownOptions (through click/hover)
 *
 * otherwise I think it's possible to change the elements through
 * this.flounderControl.refs and re-render the wrapper.
 */
export default class FlounderDropdownDriver
{
    constructor( wrapper )
    {
        // Nessie Control
        this.wrapper = wrapper;
        // the 3rd party control
        this.innerFlounderComponent = wrapper.node.refs.flounder;
    }

    /**
     * Choosing Item in an opened Dropdown.
     * @param {String|String[]} value - value or array of values of the selected
     * items
     * @return {Object} wrapper
     */
    chooseItemByValue( value )
    {
        return chooseItem( ( ...params ) =>
            this.innerFlounderComponent.clickByValue( ...params ),
            value,
            'value',
            this.wrapper
        );
    }

    /**
     * Choosing Item in an opened Dropdown.
     * @param {String|String[]} text - text or array of texts of the selected
     * items
     * @return {Object} wrapper
     */
    chooseItemByText( text )
    {
        return chooseItem( ( ...params ) =>
            this.innerFlounderComponent.clickByText( ...params ),
            text,
            'text',
            this.wrapper
        );
    }

     /**
     * Click dropdown option(s) by index
     * @param {int|int[]} index - index or array of indexes of the selected
     * items
     * @return {Object} wrapper
     */
    chooseItemByIndex( index )
    {
        return chooseItem( ( ...params ) =>
            this.innerFlounderComponent.clickByIndex( ...params ),
            index,
            'index',
            this.wrapper
        );
    }

    /**
     * Removes all tags by clicking on them (only for flounder configured for
     * tags)
     * @return {Object} wrapper
     */
    removeAllTags()
    {
        if ( this.wrapper.prop( 'isDisabled' ) )
        {
            throw new Error( ERRORS.DROPDOWN_DISABLED );
        }

        if ( this.wrapper.prop( 'isReadOnly' ) )
        {
            throw new Error( ERRORS.DROPDOWN_READ_ONLY );
        }

        if ( !this.wrapper.prop( 'multipleTags' ) )
        {
            throw new Error( ERRORS.CANNOT_DESELECT_TAGS );
        }

        const tagWrapper = this.innerFlounderComponent.refs.multiTagWrapper;

        const tags = Array.prototype.slice.call( tagWrapper.children, 0, -1 );

        tags.forEach( el =>
        {
            el.children[ 0 ].click();
        } );

        return this;
    }

    getFlounderAPI()
    {
        return this.innerFlounderComponent;
    }

    getSelectedValues()
    {
        return this.innerFlounderComponent.getSelectedValues();
    }

    getSelectedItems()
    {
        return this.innerFlounderComponent.getSelected();
    }

    getErrorMessage()
    {
        return this.wrapper.find( 'IconWithTooltip' ).driver().getMessage();
    }
}

/**
 * General Method for selecting items
 * @param {Function} method - The flounder method to choose items with
 * @param {String|String[]|Number|Number[]} searchTerm - index/text/value
 * @param {String} errorByWhat - string representation of index/text/value
 * @param {Object} wrapper - the Enzyme ReactWrapper
 * @return {Object} wrapper
 */
function chooseItem( method, searchTerm, errorByWhat, wrapper )
{
    if ( wrapper.prop( 'isDisabled' ) )
    {
        throw new Error( ERRORS.DROPDOWN_DISABLED );
    }

    if ( wrapper.prop( 'isReadOnly' ) )
    {
        throw new Error( ERRORS.DROPDOWN_READ_ONLY );
    }

    const multiple = searchTerm instanceof Array;

    const selected = method( searchTerm, multiple );

    if ( selected == null ||
         ( selected instanceof Array && selected.indexOf( null ) >= 0 ) )
    {
        throw new Error(
            ERRORS.CANNOT_SELECT_ITEMS( errorByWhat, searchTerm ) );
    }
    return this;
}
