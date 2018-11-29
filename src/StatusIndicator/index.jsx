/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import ThemeContext         from '../Theming/ThemeContext';
import { evalTheme }        from '../Theming/withTheme';

export default class StatusIndicator extends React.PureComponent
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Status text (JSX node; overrides label prop)
         */
        children : PropTypes.node,
        /**
         *  CSS class map
         */
        cssMap   : PropTypes.objectOf( PropTypes.string ),
        /**
        *  Status text
        */
        label    : PropTypes.string,
        /**
         *  Display as active/deactivated
         */
        status   : PropTypes.oneOf( [ 'alert', 'critical', 'promoted' ] ),
    };

    static defaultProps =
    {
        children : undefined,
        label    : undefined,
        status   : 'promoted',
    };

    static displayName = 'StatusIndicator';

    static didWarn = {};

    render()
    {
        const deprecatedStatusOptions = [ 'active', 'deactivated' ];

        const {
            children, className, label, status,
        } = this.props;

        const cssMap = evalTheme( this.context.StatusIndicator, this.props );

        if ( deprecatedStatusOptions.includes( status ) &&
            !StatusIndicator.didWarn[ status ] )
        {
            console.warn( `StatusIndicator: 'status' option '${status}' is \
deprecated. Please use one of 'alert', 'critical' or 'promoted' instead.` );
            StatusIndicator.didWarn[ status ] = true;
        }

        return (
            <div
                className = { buildClassName( className, cssMap, { status } ) }>
                { children || label }
            </div>
        );
    }
}
