import React                          from 'react';
import PropTypes                      from 'prop-types';

import { generateId, buildClassName } from '../utils';
import styles                         from './tab.css';

const Tab = ( {
    children,
    className,
    cssMap,
    id = generateId( 'Tab' ),
    label,
} ) => (
    <div
        className  = { buildClassName( className, cssMap ) }
        aria-label = { label }
        id         = { id }
        role       = "tabpanel">
        { children }
    </div>
);

Tab.propTypes =
{
    /**
     * Section content
     */
    children  : PropTypes.node,
    /**
     * Extra CSS class name
     */
    className : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     * HTML id attribute (overwrite default)
     */
    id        : PropTypes.string,
    /**
    *  Label to show in TabButton of this tab
    */
    label     : PropTypes.string,
};

Tab.defaultProps =
{
    children  : undefined,
    className : undefined,
    cssMap    : styles,
    id        : undefined,
    label     : undefined,
};

export default Tab;
