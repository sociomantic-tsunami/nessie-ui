/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                        from 'react';
import PropTypes                    from 'prop-types';

import { Icon, Spinner }            from '..';

import { attachEvents, generateId } from '../utils';
import ThemeContext                 from '../Theming/ThemeContext';
import { createCssMap }             from '../Theming';


export default class Button extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Label text (React node; overrides label prop)
         */
        children     : PropTypes.node,
        /**
         *  CSS class map
         */
        cssMap       : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Icon position relative to label
         */
        iconPosition : PropTypes.oneOf( [ 'left', 'right' ] ),
        /**
         *  Icon type to display
         */
        iconType     : PropTypes.oneOf( [
            'account',
            'add-circle',
            'add',
            'alert',
            'approved',
            'arrow-down',
            'arrow-up',
            'arrow',
            'bell',
            'board',
            'calendar',
            'close-circle',
            'close-thick',
            'close',
            'dash',
            'dashboard',
            'deactivated',
            'declined',
            'delete',
            'down',
            'download',
            'duplicate',
            'edit-circle',
            'edit',
            'ended',
            'error',
            'file',
            'graph',
            'hide',
            'info',
            'inspect',
            'left',
            'lightbulb',
            'link',
            'loader',
            'megaphone',
            'options',
            'paused',
            'pending',
            'preview',
            'puzzle-piece',
            'reset',
            'right',
            'search',
            'show',
            'sociomantic',
            'star-stroke',
            'star',
            'swap',
            'table',
            'up',
            'upload',
            'validation',
            'none',
        ] ),
        /**
         * Component identifier
         */
        id          : PropTypes.string,
        /**
         *  Display as disabled
         */
        isDisabled  : PropTypes.bool,
        /**
         *  Display as loading
         */
        isLoading   : PropTypes.bool,
        /**
         *  Label text
         */
        label       : PropTypes.string,
        /**
         *  click callback function: ( { id } ) => ...
         */
        onClick     : PropTypes.func,
        /**
         *  mouse out callback function: ( { id } ) => ...
         */
        onMouseOut  : PropTypes.func,
        /**
         *  mouse over callback function: ( { id } ) => ...
         */
        onMouseOver : PropTypes.func,
        /**
         *  Role/style
         */
        role        : PropTypes.oneOf( [
            'default',
            'secondary',
            'subtle',
            'promoted',
            'critical',
            'control',
        ] ),
    };

    static defaultProps =
    {
        children     : undefined,
        cssMap       : undefined,
        iconPosition : 'left',
        iconType     : 'none',
        id           : undefined,
        isDisabled   : false,
        isLoading    : false,
        label        : undefined,
        onClick      : undefined,
        onMouseOut   : undefined,
        onMouseOver  : undefined,
        role         : 'default',
    };

    static displayName = 'Button';

    buttonRef = React.createRef();

    constructor( props )
    {
        super();
        this.state = { id: props.id || generateId( 'Button' ) };
    }

    focus()
    {
        this.buttonRef.current.focus();
    }

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.Button, this.props ),
            iconType,
            isDisabled,
            isLoading,
            label,
        } = this.props;

        const { id } = this.state;

        return (
            <button
                { ...attachEvents( this.props ) }
                className = { cssMap.main }
                disabled  = { isDisabled }
                id        = { id }
                ref       = { this.buttonRef }
                type      = "button">
                <div className = { cssMap.content }>
                    { ( iconType && iconType !== 'none' ) &&
                        <Icon
                            className = { cssMap.icon }
                            size      = "S"
                            type      = { iconType } />
                    }
                    <div className = { cssMap.label }>
                        { children || label }
                    </div>
                </div>
                { ( isLoading && !isDisabled ) &&
                    <div className = { cssMap.loadingOverlay }>
                        <Spinner
                            className = { cssMap.spinner }
                            size = "S" />
                    </div>
                }
            </button>
        );
    }
}
