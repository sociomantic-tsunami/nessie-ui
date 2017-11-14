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
import { buildOptionLabel } from './utils';
import styles               from './listBoxOption.css';


const ListBoxOption = ( {
    aria,
    className,
    cssMap,
    description,
    iconType,
    id = generateId( 'ListBoxOption' ),
    isActive,
    isDisabled,
    isSelected,
    onClick,
    onMouseOut,
    onMouseOver,
    ...props
} ) => (
    <li
        { ...mapAria( {
            ...aria,
            selected : isSelected,
            role     : 'option',
        } ) }
        className = { buildClassName( className, cssMap, {
            disabled : isDisabled,
            active   : isActive,
            selected : isSelected,
        } ) }
        id          = { id }
        onClick     = { eventHandler( onClick, id ) }
        onMouseOut  = { eventHandler( onMouseOut, id ) }
        onMouseOver = { eventHandler( onMouseOver, id ) }>
        { ( iconType && iconType !== 'none' ) &&
            <Icon
                className = { cssMap.icon }
                type      = { iconType }
                variant   = "stroke" />
        }
        <div className = { cssMap.text }>
            { buildOptionLabel( props ) }
            { description &&
                <Text noWrap overflowIsHidden role = "subtle">
                    { description }
                </Text> }
        </div>
    </li>
);

ListBoxOption.propTypes = {
    aria        : PropTypes.objectOf( PropTypes.string ),
    children    : PropTypes.node,
    className   : PropTypes.string,
    cssMap      : PropTypes.objectOf( PropTypes.string ),
    description : PropTypes.string,
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
