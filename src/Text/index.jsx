/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                             from 'react';
import PropTypes                         from 'prop-types';

import { attachEvents, useThemeClasses } from '../utils';


const componentName = 'Text';

const Text = props =>
{
    const {
        children,
        color,
        letterSpacing,
        lineHeight,
        text,
        textRef,
    } = props;

    const cssMap = useThemeClasses( componentName, props );

    return (
        <div
            { ...attachEvents( props ) }
            className = { cssMap.main }
            ref       = { textRef }
            style     = { { color, letterSpacing, lineHeight } }>
            { children || text }
        </div>
    );
};

Text.propTypes =
{
    /**
     *  Capitalize text
     */
    allCaps   : PropTypes.bool,
    /**
     *  Text content (JSX node; overrides text prop)
     */
    children  : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className : PropTypes.string,
    /**
     *  Text Color
     */
    color     : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Font rules to apply to text
     */
    font      : PropTypes.oneOf( [
        'L1',
        'L2',
        'H1',
        'H2',
        'H3',
        'H4',
        'Body1',
        'Body2',
        'Body3',
        'Body4',
        'Link',
        'Caption1',
        'Caption2',
        'Caption3',
    ] ),
    /**
     * Letter Spacing for the text
     */
    letterSpacing    : PropTypes.string,
    /**
     * Line Height for the text
     */
    lineHeight       : PropTypes.string,
    /**
     *  Don’t wrap text to the next line
     */
    noWrap           : PropTypes.bool,
    /**
     *  Clip overflow
     */
    overflowIsHidden : PropTypes.bool,
    /**
     *  Role (style) to apply to text
     */
    role             : PropTypes.oneOf( [
        'default',
        'subtle',
        'promoted',
        'critical',
        'link',
    ] ),
    /**
     *  Size to apply to text
     */
    size : PropTypes.oneOf( [
        'XXXL',
        'XXL',
        'XL',
        'L',
        'M',
        'S',
        'XS',
        'XXS',
    ] ),
    /**
     *  Text string
     */
    text      : PropTypes.string,
    /**
     * Text alignment
     */
    textAlign : PropTypes.oneOf( [ 'left', 'center', 'right' ] ),
    /**
     *  Callback that receives ref to the text div: ref => ...
     */
    textRef   : PropTypes.func,
    /**
     *  Style to apply to text
     */
    variant   : PropTypes.oneOf( [
        'Light',
        'LightIt',
        'Regular',
        'RegularIt',
        'SemiBold',
        'SemiBoldIt',
        'Bold',
        'BoldIt',
        'ExtraBold',
        'ExtraBoldIt',
    ] ),
};

Text.defaultProps =
{
    allCaps          : false,
    children         : undefined,
    className        : undefined,
    color            : undefined,
    cssMap           : undefined,
    font             : undefined,
    letterSpacing    : undefined,
    lineHeight       : undefined,
    noWrap           : false,
    overflowIsHidden : false,
    role             : 'default',
    size             : 'M',
    text             : undefined,
    textAlign        : undefined,
    textRef          : undefined,
    variant          : 'Regular',
};

Text.displayName = componentName;

export default Text;
