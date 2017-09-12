import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Css                  from '../hoc/Css';
import IconButton           from '../IconButton';
import Text                 from '../Text';

export default class Tag extends Component
{
    static propTypes =
    {
        /**
         *  Display as disabled
         */
        isDisabled : PropTypes.bool,
        /**
         *  Display as read-only
         */
        isReadOnly : PropTypes.bool,
        /**
         *  Tag label (string)
         */
        label      : PropTypes.string,
        /**
         *  Tag label (string; overrides label prop)
         */
        children   : PropTypes.string,
        /**
         *   onClick callback function for delete icon
         */
        onClick    : PropTypes.func,
        /**
         * Display as hover when required from another component
         */
        forceHover : PropTypes.bool

    };

    static defaultProps =
    {
        isDisabled : false,
        isReadOnly : false,
        forceHover : false,
        cssMap     : require( './tag.css' )
    };

    render()
    {
        const {
            children,
            className,
            cssMap,
            label,
            ...props
        } = this.props;

        const { isDisabled } = props;

        const labelString = typeof children === 'string' ? children : label;

        return (
            <Css
                cssMap   = { cssMap }
                cssProps = { { disabled: isDisabled } }
            >
                <div className = { className }>
                    <Text overflowIsHidden className = { cssMap.label }>
                        { labelString }
                    </Text>
                    <IconButton
                        { ...props }
                        iconType   = "close"
                        className  = { cssMap.delete }
                    />
                </div>
            </Css>
        );
    }
}
