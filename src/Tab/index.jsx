import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './tab.css';


const Tab = ( {
    children,
    className,
    cssMap,
    label,
    onClick,
} ) =>
{
    if ( !Tab.didWarn && onClick )
    {
        console.warn( 'Tab: ‘onClick’ prop is deprecated and will be removed \
in the next major release.' );
        Tab.didWarn = true;
    }
    return (
        <div
            className  = { buildClassName( className, cssMap ) }
            aria-label = { label }
            onClick    = { onClick }
            role       = "tabpanel">
            { children }
        </div>
    );
};

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
    *  Label to show in TabButton of this tab
    */
    label     : PropTypes.string,
};

Tab.defaultProps =
{
    children  : undefined,
    className : undefined,
    cssMap    : styles,
    label     : undefined,
};

export default Tab;
