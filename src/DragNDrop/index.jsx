/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import { buildClassName }   from '../utils';
import { Spinner }          from '../index';
import ThemeContext         from '../Theming/ThemeContext';
import { evalTheme }        from '../Theming/withTheme';

export default class DragNDrop extends Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  DragNDrop target element children
         */
        children       : PropTypes.node,
        /**
        *  DragNDrop state
        */
        dragNDropState : PropTypes.oneOf( [
            'default',
            'dragOver',
            'uploading',
        ] ),
        /**
         * Message shown in dragOver state
         */
        message : PropTypes.node,
    };

    static defaultProps =
    {
        dragNDropState : 'default',
    };

    static displayName = 'DragNDrop';

    render()
    {
        const {
            children,
            className,
            dragNDropState,
            message,
        } = this.props;

        const cssMap = evalTheme( this.context.DragNDrop, this.props );
        let dropzoneIsVisible   = false;
        let isUploading         = false;

        if ( dragNDropState === 'default' )
        {
            dropzoneIsVisible   = false;
            isUploading         = false;
        }

        else if ( dragNDropState === 'dragOver' )
        {
            dropzoneIsVisible   = true;
            isUploading         = false;
        }

        else if ( dragNDropState === 'uploading' )
        {
            dropzoneIsVisible   = true;
            isUploading         = true;
        }

        const dropzoneContentContainer = (
            <div className = { cssMap.dropzoneContentContainer }>
                { !isUploading &&
                    <div className = { cssMap.message }>
                        { message }
                    </div>
                }
                { isUploading &&
                    <Spinner
                        className = { cssMap.spinner }
                        size      = "big" />
                }
            </div>
        );

        return (
            <div
                className = { buildClassName( className, cssMap, {
                    dropzoneIsVisible,
                } ) }>
                <div className = { cssMap.content }>
                    { children }
                </div>
                { dropzoneIsVisible && dropzoneContentContainer }
            </div>
        );
    }
}
