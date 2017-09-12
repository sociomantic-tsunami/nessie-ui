/* eslint-disable valid-jsdoc, no-magic-numbers */
import { IconButton } from 'nessie';

/* eslint-disable max-len */
const ERRORS = {
    MODULE_NOT_COLLAPSIBLE      : 'Module is not collapsible. Cannot simulate toggle.',
    MODULE_HAS_NO_DELETE        : 'Module has no delete button. Cannot simulate delete.',
    MODULE_HAS_NO_CUSTOM_HEADER : 'Module has no customHeader. Cannot get contents.'
};
/* eslint-disable max-len */

export default class ModuleDriver
{
    constructor( wrapper )
    {
        this.wrapper = wrapper;
        this.cssMap  = wrapper.props().cssMap;
    }

    /**
     * Simulate human toggle by clicking on the arrow.
     */
    toggle()
    {
        const toggle = this.wrapper.find( IconButton ).last();

        if ( toggle.length === 0 )
        {
            throw new Error( ERRORS.MODULE_NOT_COLLAPSIBLE );
        }

        toggle.simulate( 'click' );
        return this.wrapper;
    }

    /**
     * Simulate clicking on the module's delete button (if applicable)
     */
    clickDelete()
    {
        if ( !this.wrapper.prop( 'isDeletable' ) )
        {
            throw new Error( ERRORS.MODULE_HAS_NO_DELETE );
        }

        const deleteButton = this.wrapper.find( IconButton ).first();

        deleteButton.driver().click();

        return this.wrapper;
    }

    getCustomHeader()
    {
        if ( !this.wrapper.props().customHeader )
        {
            throw new Error( ERRORS.MODULE_HAS_NO_CUSTOM_HEADER );
        }
        return this.wrapper.find( `.${this.cssMap.header}` ).children();
    }

    getContent()
    {
        return this.wrapper.find( `.${this.cssMap.content}` ).children();
    }
}
