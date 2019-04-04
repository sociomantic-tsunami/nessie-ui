/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                      from 'react';
import PropTypes                  from 'prop-types';

import { attachEvents, useThemeClasses } from '../utils';


const componentName = 'Popup';

const Popup = props =>
{
    const { children } = props;

    const cssMap = useThemeClasses( componentName, props );

    return (
        <div
            { ...attachEvents( props ) }
            className = { cssMap.main }>
            { children }
        </div>
    );
};

Popup.propTypes = {
    children  : PropTypes.node,
    className : PropTypes.string,
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    hasError  : PropTypes.bool,
    padding   : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    size      : PropTypes.oneOf( [ 'content', 'default' ] ),
};

Popup.defaultProps = {
    children  : undefined,
    className : undefined,
    cssMap    : undefined,
    hasError  : false,
    padding   : 'none',
    size      : 'default',
};

Popup.displayName = componentName;

export default Popup;
