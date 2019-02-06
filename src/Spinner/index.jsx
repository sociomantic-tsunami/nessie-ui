/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                    from 'react';
import PropTypes                from 'prop-types';

import { useTheme }             from '../Theming';

import { Icon }                 from '..';

const componentName = 'Spinner';

const Spinner = ( props ) =>
{
    const { size } = props;
    const cssMap = useTheme( componentName, props );
    return (
        <Icon
            className = { cssMap.main }
            type = "loader"
            size = { size }
        />
    );
};

Spinner.propTypes =
{
    /**
     *  Size of the Spinner
     */
    cssMap : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Size of the Spinner
     */
    size   : PropTypes.oneOf( [
        'S',
        'M',
        'L',
        'XL',
    ] ),
};

Spinner.defaultProps =
{
    cssMap : undefined,
    size   : 'M',
};

Spinner.displayName = componentName;

export default Spinner;
