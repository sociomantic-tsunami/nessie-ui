import React                        from 'react';
import PropTypes                    from 'prop-types';

import { H2, Icon }                 from '../index';
import { buildClassName }           from '../utils';
import styles                       from './accordionItemHeader.css';

const AccordionItemHeader = ( {
    className,
    cssMap,
    headerText,
    id,
    idContent,
    isDisabled,
    isOpen,
    onClick
} ) => (
    <div
        className = { buildClassName( className, cssMap, {
            disabled : isDisabled,
            open     : isOpen
        } ) }
        role = "heading">
        <button
            aria-expanded = { isOpen }
            aria-controls = { idContent }
            className     = { cssMap.headerButton }
            id            = { id }
            type          = "button"
            onClick       = { onClick }>
            <H2 className = { cssMap.text }>{ headerText }</H2>
            <Icon
                className = { cssMap.icon }
                size = "M"
                type = { isOpen ? 'up' : 'down' } />
        </button>
    </div>
);

AccordionItemHeader.propTypes =
{
    /**
     *  CSS class name
     */
    className  : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap     : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Accordion Item title
     */
    headerText : PropTypes.string,
    /**
     *  if of the header
     */
    id         : PropTypes.string,
    /**
     *  id of the content
     */
    idContent  : PropTypes.string,
    /**
     *  Display as disabled/read-only
     */
    isDisabled : PropTypes.bool,
    /**
     *  Accordion item expanded
     */
    isOpen     : PropTypes.bool,
    /**
     *  Button click callback function: ( e ) => { ... }
     */
    onClick    : PropTypes.func
};

AccordionItemHeader.defaultProps =
{
    className  : undefined,
    cssMap     : styles,
    headerText : undefined,
    id         : undefined,
    idContent  : undefined,
    isDisabled : false,
    isOpen     : false,
    onClick    : undefined,
};

export default AccordionItemHeader;
