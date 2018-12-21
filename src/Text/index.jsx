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
import { createCssMap }   from '../Theming';

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
         *  click callback function
         */
        onClick          : PropTypes.func,
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

    static defaultProps =
    {
        allCaps          : false,
        color            : undefined,
        letterSpacing    : undefined,
        lineHeight       : undefined,
        noWrap           : false,
        onClick          : undefined,
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
            onClick,
            text,
            textRef,
        } = this.props;

        return (
            <div
                className = { cssMap.main }
                onClick   = { onClick }
                ref       = { textRef }
                style     = { { color, letterSpacing, lineHeight } }>
                { children || text }
            </div>
        );
    }
}
