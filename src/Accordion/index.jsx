import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import { H2 }             from '../index';
import styles             from './accordion.css';

const Accordion = ( {
    children,
    className,
    cssMap,
    hasError,
    header,
    isDisabled,
} ) =>
{
    const accorItems = React.Children.toArray( children ).map( accorItem =>
        React.cloneElement( accorItem,
            {
                isDisabled : isDisabled || accorItem.props.isDisabled,
            }
        )
    );

    return (
        <div
            className = { buildClassName( className, cssMap, {
                error : !isDisabled && hasError
            } ) }>
            { header &&
                <H2>{ header }</H2>
            }
            { accorItems }
        </div>
    );
};

Accordion.propTypes =
{
    /**
     *  Accordion content ( Accordion Items )
     */
    children   : PropTypes.node,
    /**
     *  CSS class name
     */
    className  : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap     : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Display as error/invalid
     */
    hasError   : PropTypes.bool,
    /**
     * Header text
     */
    header     : PropTypes.string,
    /**
     *  Display as disabled/read-only
     */
    isDisabled : PropTypes.bool,
};

Accordion.defaultProps =
{
    children  : undefined,
    className : undefined,
    cssMap    : styles,
    hasError  : false,
    header    : undefined,
    isDisbled : false,
};

export default Accordion;
