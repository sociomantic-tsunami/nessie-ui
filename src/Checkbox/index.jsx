/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */


import React, {
    useImperativeHandle,
    useRef,
    forwardRef,
} from 'react';
import PropTypes    from 'prop-types';

import { Text }     from '..';

import {
    attachEvents,
    useId,
    useTheme,
} from '../utils';


const componentName = 'Checkbox';

const Checkbox = forwardRef( ( props, ref ) =>
{
    const checkBoxRef = useRef();

    useImperativeHandle( ref, () => ( {
        focus : () => checkBoxRef.current.focus(),
    } ) );

    const {
        children,
        isChecked,
        isDefaultChecked,
        isDisabled,
        label,
    } = props;

    const cssMap = useTheme( componentName, props );
    const id = useId( componentName, props );

    let labelContent = children || label;

    if ( typeof labelContent === 'string' )
    {
        labelContent =
            <Text className = { cssMap.labelText }>{ labelContent }</Text>;
    }

    return (
        <div
            className = { cssMap.main }>
            <input
                { ...attachEvents( props ) }
                checked   = { isChecked }
                className = { cssMap.input }
                defaultChecked = { isDefaultChecked }
                disabled  = { isDisabled }
                id        = { id }
                type      =  "checkbox" />
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


Checkbox.propTypes =
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
};

Checkbox.defaultProps =
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
};

Checkbox.displayName = componentName;

export default Checkbox;
