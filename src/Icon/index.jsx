import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';

const statusIcons = [
    'alert',
    'approved',
    'declined',
    'ended',
    'error',
    'pending'
];

export default class Icon extends Component
{
    static propTypes =
    {
        /**
         *  Icon size
         */
        size : PropTypes.oneOf( [
            'S',
            'M',
            'L',
            'XL',
            'XXL'
        ] ),
        /**
         *  Icon to show
         */
        type : PropTypes.oneOf( [
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
            'hide'
        ] ),
        /**
        *  Icon variant to show
        */
        variant : PropTypes.oneOf( [
            'fill',
            'stroke'
        ] ),
        /**
         * ARIA label
         */
        label : PropTypes.string,
    };

    static defaultProps =
    {
        size       : 'S',
        forceHover : false,
        isDisabled : false,
        variant    : 'fill',
        cssMap     : require( './icon.css' )
    };

    render()
    {
        const {
            children,
            className,
            cssMap,
            label,
            size,
            type,
            variant
        } = this.props;

        const xLink = statusIcons.indexOf( type ) > -1 ?
            `#icon__${type}-${variant}` : `#icon__${type}`;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { size, type } }>
                <svg
                    className  = { className }
                    aria-label = { children || label }>
                    <use xlinkHref = { xLink } />
                </svg>
            </Css>
        );
    }
}
