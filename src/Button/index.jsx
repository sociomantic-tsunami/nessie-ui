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
    forwardRef
} from 'react';

import PropTypes                                         from 'prop-types';
import { Icon, Spinner }                                 from '..';

import { attachEvents, generateId }                      from '../utils';
import { useTheme }                                      from '../Theming';

const componentName = 'Button';

const Button = forwardRef( ( props, ref ) =>
{

    const buttonRef = useRef();

    useImperativeHandle( ref, () => ( {
        focus : () =>
        {
            buttonRef.current.focus();
        }
    } ) );

    const {
        children,
        iconType,
        cssMap = useTheme( componentName, props ),
        id = generateId( componentName ),
        isDisabled,
        isLoading,
        label,
    } = props;


    return (
        <button
            { ...attachEvents( props ) }
            className = { cssMap.main }
            disabled  = { isDisabled }
            id        = { id }
            ref       = { buttonRef }
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
                    <Spinner className = { cssMap.spinner } />
                </div>
            }
        </button>
    );
} );

Button.displayName = componentName;

Button.propTypes =
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

Button.defaultProps =
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

export default Button;
