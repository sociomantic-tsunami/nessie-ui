/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import { useContext }     from 'react';

import ThemeContext       from '../Theming/ThemeContext';

/**
 * Builds class names from theme
 *
 * @param {String} displayName component's displayName
 * @param {Object} props component's props
 *
 * @return {Object} cssMap containing component's styles
 */
function useTheme( displayName, props )
{
    const { [ displayName ] : theme } = useContext( ThemeContext );

    return props.cssMap ||
        ( typeof theme === 'function' ? theme( props ) : theme );
}

export default useTheme;
