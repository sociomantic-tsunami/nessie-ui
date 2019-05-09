/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */


import React, { forwardRef } from 'react';
import PropTypes             from 'prop-types';

import { Text }              from '..';

import {
    attachEvents,
    useId,
    useThemeClasses,
} from '../utils';


const componentName = 'Radio';

const Radio = forwardRef( ( props, ref ) =>
{
    const {
        children,
        isChecked,
        isDefaultChecked,
        isDisabled,
        label,
        style,
        value,
    } = props;

    const cssMap = useThemeClasses( componentName, props );
    const id = useId( componentName, props );

    let labelContent = children || label;

    if ( typeof labelContent === 'string' )
    {
        labelContent =
            <Text>{ labelContent }</Text>;
    }

    return (
        <div className = { cssMap.main } ref = { ref } style = { style }>
            <input
                { ...attachEvents( props ) }
                checked   = { isChecked }
                className = { cssMap.input }
                defaultChecked = { isDefaultChecked }
                disabled  = { isDisabled }
                id        = { id }
                type      =  "radio"
                value     = { value } />
            <label className = { cssMap.label } htmlFor = { id }>
                { labelContent &&
                    <span className = { cssMap.labelContent }>
                        { labelContent }
                    </span>
                }
            </label>
        </div>
    );
} );


Radio.propTypes =
{
    /**
     *  Label content (React node; overrides label prop)
     */
    children         : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className        : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap           : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Display as error/invalid
     */
    hasError         : PropTypes.bool,
    /**
     *  Component id
     */
    id               : PropTypes.string,
    /**
     *  Display as checked (controlled input)
     */
    isChecked        : PropTypes.bool,
    /**
     *  Display as checked by default (uncontrolled input)
     */
    isDefaultChecked : PropTypes.bool,
    /**
     *  Display as disabled
     */
    isDisabled       : PropTypes.bool,
    /**
     *  Label content (string)
     */
    label            : PropTypes.string,
    /**
     *  change callback prop
     */
    onChange         : PropTypes.func,
    /**
     *  click callback prop
     */
    onClick          : PropTypes.func,
    /**
     *  Style overrides
     */
    style            : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Radio value
     */
    value            : PropTypes.string,
};

Radio.defaultProps =
{
    children         : undefined,
    className        : undefined,
    cssMap           : undefined,
    hasError         : false,
    id               : undefined,
    isChecked        : undefined,
    isDefaultChecked : undefined,
    isDisabled       : false,
    label            : undefined,
    onChange         : undefined,
    onClick          : undefined,
    style            : undefined,
    value            : undefined,
};

Radio.displayName = componentName;

export default Radio;
