/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Children }       from 'react';
import PropTypes                 from 'prop-types';

import { CheckableGroup }        from '../index';
import { generateId }            from '../utils';
import { buildRadiosFromValues } from './utils';


const RadioGroup = ( {
    children,
    id = generateId( 'RadioGroup' ),
    selectedValue,
    values,
    ...props
} ) =>
{
    let items = children ?
        Children.toArray( children ) : buildRadiosFromValues( values );

    if ( selectedValue )
    {
        items = items.map( item => React.cloneElement( item, {
            isChecked : item.props.value === selectedValue,
        } ) );
    }

    return <CheckableGroup { ...props } id = { id }>{ items }</CheckableGroup>;
};

RadioGroup.propTypes =
{
    /**
     *  Radios in the group (overrides values prop)
     */
    children              : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className             : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap                : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Tooltip message text (string or JSX)
     */
    errorMessage          : PropTypes.node,
    /**
     *  Tooltip is displayed
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
     * Force display as hover
     */
    forceHover            : PropTypes.bool,
    /**
     *  Display as error/invalid
     */
    hasError              : PropTypes.bool,
    /**
     *  Component id
     */
    id                    : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled            : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly            : PropTypes.bool,
    /**
     *  Group label text string or JSX node
     */
    label                 : PropTypes.node,
    /**
     *  How to lay out the Radios
     */
    layout                : PropTypes.oneOf( [ 'horizontal', 'vertical' ] ),
    /**
     *  HTML name attribute of Checkables in group
     */
    name                  : PropTypes.string,
    /**
     *  onChange callback function : ( e ) => { ... }
     */
    onChange              : PropTypes.func,
    /**
     *  onMouseOut callback function : ( e ) => { ... }
     */
    onMouseOut            : PropTypes.func,
    /**
     *  onMouseOver callback function : ( e ) => { ... }
     */
    onMouseOver           : PropTypes.func,
    /**
    *  Array of selected values
    */
    selectedValue         : PropTypes.string,
    /**
    *  Array of values to build the Radios
    */
    values                : PropTypes.oneOfType( [
        PropTypes.arrayOf( PropTypes.string ),
        PropTypes.arrayOf( PropTypes.object ),
    ] ),
};

RadioGroup.defaultProps =
{
    children              : undefined,
    className             : undefined,
    cssMap                : undefined,
    errorMessage          : undefined,
    errorMessageIsVisible : false,
    forceHover            : false,
    hasError              : false,
    id                    : undefined,
    isDisabled            : false,
    isReadOnly            : false,
    label                 : undefined,
    layout                : 'horizontal',
    name                  : undefined,
    onChange              : undefined,
    onMouseOut            : undefined,
    onMouseOver           : undefined,
    selectedValue         : undefined,
    values                : undefined,
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
