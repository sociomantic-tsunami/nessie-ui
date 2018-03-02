import React                          from 'react';
import PropTypes                      from 'prop-types';

import IconButton                     from '../IconButton';
import Text                           from '../Text';
import { buildClassName, generateId } from '../utils';
import styles                         from './tag.css';

const Tag = ( {
    children,
    className,
    cssMap,
    forceHover,
    id = generateId( 'Tag' ),
    isDisabled,
    isReadOnly,
    label,
    onClick,
} ) =>
{
    let labelText = children || label;

    if ( typeof labelText === 'string' )
    {
        labelText = (
            <Text className = { cssMap.label } overflowisHidden>
                { labelText }
            </Text>
        );
    }

    return (
        <div
            className = { buildClassName( className, cssMap, {
                disabled : isDisabled,
            } ) }>
            { labelText }
            <IconButton
                className  = { cssMap.delete }
                forceHover = { forceHover }
                iconType   = "close"
                isDisabled = { isDisabled }
                isReadOnly = { isReadOnly }
                onClick    = { onClick }
                value      = { id } />
        </div>
    );
};

Tag.propTypes =
{
    /**
     *  Tag label (JSX node; overrides label prop)
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
     * Display as hover when required from another component
     */
    forceHover : PropTypes.bool,
    /**
     *  component id
     */
    id         : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly : PropTypes.bool,
    /**
     *  Tag label (string)
     */
    label      : PropTypes.string,
    /**
     *   onClick callback function for delete icon
     */
    onClick    : PropTypes.func,
};

Tag.defaultProps =
{
    children   : undefined,
    className  : undefined,
    cssMap     : styles,
    forceHover : false,
    id         : undefined,
    isDisabled : false,
    isReadOnly : false,
    label      : undefined,
    onClick    : undefined,
};

export default Tag;
