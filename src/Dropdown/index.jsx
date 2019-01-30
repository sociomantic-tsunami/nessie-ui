/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
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

const componentName = 'Dropdown';

const Dropdown = props =>
{
    const { children } = props;

    const cssMap = useTheme( componentName, props );

    return (
        <div
            { ...attachEvents( props ) }
            className = { cssMap.main }>
            { children }
        </div>
    );
};

Dropdown.propTypes = {
    children  : PropTypes.node,
    className : PropTypes.string,
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    hasError  : PropTypes.bool,
    padding   : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    size      : PropTypes.oneOf( [ 'content', 'default' ] ),
};

Dropdown.defaultProps = {
    children  : undefined,
    className : undefined,
    cssMap    : undefined,
    hasError  : false,
    padding   : 'none',
    size      : 'default',
};

Dropdown.displayName = componentName;

export default Dropdown;
