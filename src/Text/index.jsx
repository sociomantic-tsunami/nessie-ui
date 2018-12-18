/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React              from 'react';
import PropTypes          from 'prop-types';

import ThemeContext       from '../Theming/ThemeContext';
import { createCssMap }   from '../Theming/createCss';

export default class Text extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Capitalize text
         */
        allCaps          : PropTypes.bool,
        /**
         *  Text content (JSX node; overrides text prop)
         */
        children         : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className        : PropTypes.string,
        /**
         *  Text Color
         */
        color            : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap           : PropTypes.objectOf( PropTypes.string ),
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

    static defaultProps =
    {
        allCaps          : false,
        color            : undefined,
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

    static displayName = 'Text';

    render()
    {
        const {
            children,
            color,
            cssMap = createCssMap( this.context.Text, this.props ),
            letterSpacing,
            lineHeight,
            text,
            textRef,
        } = this.props;

        return (
            <div
                className = { cssMap.main }
                ref       = { textRef }
                style     = { { color, letterSpacing, lineHeight } }>
                { children || text }
            </div>
        );
    }
}
