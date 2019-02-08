/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import PropTypes        from 'prop-types';

import { useTheme }     from '../Theming';
import { attachEvents } from '../utils';

const componentName = 'Icon';


const Icon = props =>
{
    const {
        children,
        label,
        type,
    } = props;

    const cssMap = useTheme( componentName, props );

    return (
        <svg
            { ...attachEvents( props ) }
            aria-label = { children || label }
            className  = { cssMap.main }>
            { ( type !== 'none' ) &&
            <use xlinkHref = { `#icon__${type}` } /> }
        </svg>
    );
};

Icon.propTypes =
{
    /**
     * Icon label (overrides label prop)
     */
    children  : PropTypes.string,
    /**
     *  CSS class name
     */
    className : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     * Icon label
     */
    label     : PropTypes.string,
    /**
     *  Icon role
     */
    role      : PropTypes.oneOf( [
        'default',
        'critical',
        'promoted',
        'warning',
    ] ),
    /**
     *  Icon size
     */
    size : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL' ] ),
    /**
     *  Icon to show (see https://feathericons.com/)
     */
    type : PropTypes.string,
};

Icon.defaultProps =
{
    children  : undefined,
    className : undefined,
    cssMap    : undefined,
    label     : undefined,
    role      : 'default',
    size      : 'S',
    type      : 'none',
};

Icon.displayName = componentName;

export default Icon;
