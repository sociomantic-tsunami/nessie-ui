/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { useContext }    from 'react';
import PropTypes                from 'prop-types';

import ThemeContext             from '../Theming/ThemeContext';
import { createCssMap }         from '../Theming';
import { attachEvents }         from '../utils';

const Dropdown = props =>
{
    const context = useContext( ThemeContext );

    const {
        children,
        cssMap = createCssMap( context.Dropdown, props ),
    } = props;

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

Dropdown.displayName = 'Dropdown';

export default Dropdown;
