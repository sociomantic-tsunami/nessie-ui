/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React     from 'react';
import PropTypes from 'prop-types';

import {
    buildClassName,
    createEventHandler,
    generateId,
} from '../utils';
import Text   from '../Text';
import styles from './label.css';

const Label = ( {
    children,
    className,
    cssMap,
    element,
    htmlFor,
    id = generateId( 'Label' ),
    label,
    noWrap,
    onMouseOut,
    onMouseOver,
    overflowIsHidden,
} ) =>
{
    const LabelElement = element || 'label';

    return (
        <LabelElement
            className   = { buildClassName( className, cssMap ) }
            htmlFor     = { element === 'label' ? htmlFor : null }
            onMouseOut  = { createEventHandler( onMouseOut, { id } ) }
            onMouseOver = { createEventHandler( onMouseOver, { id } ) } >
            <Text
                className        = { cssMap.label }
                noWrap           = { noWrap }
                overflowIsHidden = { overflowIsHidden }>
                { children || label }
            </Text>
        </LabelElement>
    );
};
Label.propTypes =
{
    /**
    *  Label text
    */
    label            : PropTypes.string,
    /**
     * HTML element to use (legend should only be used inside a Fieldset)
     */
    element          : PropTypes.oneOf( [ 'label', 'legend' ] ),
    /**
     *  ID of element this Label labels (HTML for attribute)
     */
    htmlFor          : PropTypes.string,
    /**
    *  Don’t wrap text to the next line
    */
    noWrap           : PropTypes.bool,
    /**
     *  Clip overflow
     */
    overflowIsHidden : PropTypes.bool,
    /**
     *  Mouse over callback function
     */
    onMouseOver      : PropTypes.func,
    /**
     *  Mouse out callback function
     */
    onMouseOut       : PropTypes.func,
};

Label.defaultProps =
{
    cssMap           : styles,
    element          : 'label',
    noWrap           : false,
    overflowIsHidden : false,
};

export default Label;
