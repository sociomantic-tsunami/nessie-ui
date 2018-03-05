import React                        from 'react';
import PropTypes                    from 'prop-types';

import { buildClassName }           from '../utils';
import styles                       from './accordionItemContent.css';

const AccordionItemContent = ( {
    className,
    cssMap,
    children,
    id,
    idHeader
} ) => (
    <div
        className = { buildClassName( className, cssMap ) }
        id              = { id }
        role            = "region"
        aria-labelledby = { idHeader } >
        { children }
    </div>
);

AccordionItemContent.propTypes =
{
    /**
     *  CSS class name
     */
    className : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Content of the accordion item
     */
    children  : PropTypes.node,
    /**
     *  id of the content
     */
    id        : PropTypes.string,
    /**
     *  if of the header
     */
    idHeader  : PropTypes.string,
};

AccordionItemContent.defaultProps =
{
    className : undefined,
    cssMap    : styles,
    children  : undefined,
    id        : undefined,
    idHeader  : undefined,
};

export default AccordionItemContent;
