/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                   from 'react';
import PropTypes               from 'prop-types';

import { useThemeClasses }     from '../utils';


const componentName = 'Tab';

const Tab = ( props ) =>
{
    const cssMap = useThemeClasses( componentName, props );
    const {
        children,
        label,
        style,
    } = props;

    return (
        <div
            className  = { cssMap.main }
            aria-label = { label }
            role       = "tabpanel"
            style      = { style }>
            { children }
        </div>
    );
};

Tab.propTypes =
{
    /**
     *  Section content
     */
    children  : PropTypes.node,
    /**
     * Extra CSS classname
     */
    className : PropTypes.string,
    /**
     * CSS classname map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Label to show in TabButton of this tab
     */
    label     : PropTypes.string,
    /**
     *  Style overrides
     */
    style     : PropTypes.objectOf( PropTypes.string ),
};

Tab.defaultProps =
{
    children  : undefined,
    className : undefined,
    cssMap    : undefined,
    label     : undefined,
    style     : undefined,
};

Tab.displayName = componentName;

export default Tab;
