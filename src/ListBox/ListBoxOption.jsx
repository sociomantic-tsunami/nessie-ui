/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React                from 'react';
import PropTypes            from 'prop-types';

import { Icon, Text }       from '../index';
import {
    buildClassName,
    eventHandler,
    generateId,
    mapAria
} from '../utils';
import styles               from './listBoxOption.css';


const ListBoxOption = ( {
    aria,
    children,
    className,
    cssMap,
    description,
    iconSize,
    iconType,
    id = generateId( 'ListBoxOption' ),
    isActive,
    isDisabled,
    isSelected,
    onClick,
    onMouseOut,
    onMouseOver,
    text,
    value,
} ) =>
{
    let label;

    if ( children )
    {
        label = children;
    }
    else
    {
        label = typeof text !== 'undefined' ? text : value;
        label = String( label );
    }

    label = typeof label === 'string' ? (
        <Text className = { cssMap.optionText } noWrap overflowIsHidden>
            { label }
        </Text> ) : label;

    return (
        <li
            { ...mapAria( {
                ...aria,
                selected : isSelected,
                role     : 'option',
            } ) }
            className = { buildClassName( className, cssMap, {
                disabled        : isDisabled,
                active          : isActive,
                selected        : isSelected,
                withDescription : !!description,
            } ) }
            id          = { id }
            onClick     = { eventHandler( onClick, id ) }
            onMouseOut  = { eventHandler( onMouseOut, id ) }
            onMouseOver = { eventHandler( onMouseOver, id ) }>
            { ( iconType && iconType !== 'none' ) &&
                <Icon
                    className = { cssMap.icon }
                    size      = { iconSize || description ? 'M' : 'S'  }
                    type      = { iconType }
                    variant   = "stroke" />
            }
            <div className = { cssMap.textContainer }>
                { label }
                { description &&
                    <Text
                        className = "test"
                        noWrap
                        overflowIsHidden
                        role = "subtle">
                        { description }
                    </Text> }
            </div>
        </li>
    );
};

ListBoxOption.propTypes = {
    aria        : PropTypes.objectOf( PropTypes.string ),
    children    : PropTypes.node,
    className   : PropTypes.string,
    cssMap      : PropTypes.objectOf( PropTypes.string ),
    description : PropTypes.string,
    iconSize    : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL', 'XXL' ] ),
    iconType    : PropTypes.oneOf( [
        'account',
        'add',
        'calendar',
        'close',
        'delete',
        'down',
        'download',
        'duplicate',
        'edit',
        'info',
        'inspect',
        'left',
        'link',
        'preview',
        'reset',
        'right',
        'search',
        'up',
        'upload',
        'validation',
        'alert',
        'approved',
        'declined',
        'ended',
        'error',
        'pending',
        'show',
        'hide',
        'none',
    ] ),
    isActive    : PropTypes.bool,
    id          : PropTypes.string,
    isDisabled  : PropTypes.bool,
    isSelected  : PropTypes.bool,
    onClick     : PropTypes.func,
    onMouseOut  : PropTypes.func,
    onMouseOver : PropTypes.func,
    text        : PropTypes.string,
    value       : PropTypes.string,
};

ListBoxOption.defaultProps = {
    aria        : undefined,
    children    : undefined,
    className   : undefined,
    cssMap      : styles,
    description : undefined,
    iconSize    : undefined,
    iconType    : 'none',
    isActive    : false,
    id          : undefined,
    isDisabled  : false,
    isSelected  : false,
    onClick     : undefined,
    onMouseOut  : undefined,
    onMouseOver : undefined,
    text        : undefined,
    value       : undefined,
};

export default ListBoxOption;
