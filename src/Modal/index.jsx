/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                            from 'react';
import PropTypes                        from 'prop-types';

import { attachEvents }                 from '../utils';
import { useTheme }                     from '../Theming';

const componentName = 'Modal';

const Modal = ( props ) =>
{
    const handleClickOverlay = ( { target, currentTarget } ) =>
    {
        if ( target !== currentTarget ) return;

        const { onClickOverlay } = props;
        if ( onClickOverlay )
        {
            onClickOverlay();
        }
    };

    const {
        children
    } = props;

    const cssMap = useTheme( componentName, props );

    return (
        <div
            { ...attachEvents( props, { onClick: false } ) }
            onClick   = { handleClickOverlay }
            className = { cssMap.main }>
            <div className = { cssMap.content }>
                { children }
            </div>
        </div>
    );
};

Modal.displayName = 'Modal';

Modal.propTypes =
{
    /**
     *  Dialog Content
     */
    children       : PropTypes.node,
    /**
     *  Extra CSS class name
     */
    className      : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap         : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Overlay onClick callback function
     */
    onClickOverlay : PropTypes.func,
};

Modal.defaultProps =
{
    children       : undefined,
    className      : undefined,
    cssMap         : undefined,
    onClickOverlay : undefined,
};


export default Modal;
