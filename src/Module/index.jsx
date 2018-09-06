/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React     from 'react';
import PropTypes from 'prop-types';

import {
    buildClassName,
    createEventHandler,
    generateId,
} from '../utils';
import H2                              from '../H2';
import H3                              from '../H3';
import H4                              from '../H4';
import { IconButton, IconWithTooltip } from '../index';
import styles                          from './module.css';


const headers = { 2: H2, 3: H3, 4: H4 };

const Module = ( {
    children,
    className,
    cssMap,
    customHeader,
    errorMessage,
    errorMessageIsVisible,
    hasError,
    hasModuleError,
    headerLevel,
    id = generateId( 'Module' ),
    isCollapsed,
    isCollapsible,
    isDeletable,
    isLoading,
    isReadOnly,
    onClickHeader,
    onMouseOutError,
    onMouseOutHeader,
    onMouseOverError,
    onClickDelete,
    onClickToggle,
    onMouseOverHeader,
    title,
} )  =>
{
    const HeaderElement = headers[ headerLevel ];

    const header = (
        <header
            className   = { cssMap.header }
            onClick     = { createEventHandler( onClickHeader, { id } ) }
            onMouseOut  = { createEventHandler( onMouseOutHeader, { id } ) }
            onMouseOver = {
                createEventHandler( onMouseOverHeader, { id } )
            }>
            { customHeader || [
                <div className = { cssMap.title }>
                    <HeaderElement>{ title }</HeaderElement>
                </div>,
                <div className = { cssMap.controls }>
                    { !!errorMessage && hasError &&
                        <IconWithTooltip
                            message          = { errorMessage }
                            iconType         = "error"
                            tooltipIsVisible = { errorMessageIsVisible }
                            onMouseOut       = { onMouseOutError }
                            onMouseOver      = { onMouseOverError } />
                    }
                    { isDeletable &&
                        <IconButton
                            iconType   = "delete"
                            onClick    = { onClickDelete }
                            isReadOnly = { isReadOnly }>
                            Delete
                        </IconButton>
                    }
                    { isCollapsible &&
                        <IconButton
                            iconType = { isCollapsed ? 'down' : 'up' }
                            onClick  = { onClickToggle }>
                            { isCollapsed ? 'Show' : 'Hide' }
                        </IconButton>
                    }
                </div>,
            ] }
        </header>
    );

    return (
        <section
            className = { buildClassName( className, cssMap, {
                collapsed   : isCollapsible && isCollapsed,
                collapsible : isCollapsible,
                error       : hasError,
                level       : headerLevel,
                moduleError : hasModuleError,
            } ) }>
            { header }
            { ( !isCollapsible || !isCollapsed ) &&
                <div className = { cssMap.content }>{ children }</div>
            }
            { isLoading  &&
                <div className = { cssMap.loadingOverlay } />
            }
        </section>
    );
};

Module.propTypes =
{
    /**
     *  Module title
     */
    title                 : PropTypes.string,
    /**
     *  Module content
     */
    children              : PropTypes.node,
    /**
     *  Allow module to be collapsed
     */
    isCollapsible         : PropTypes.bool,
    /**
     *  Display module as collapsed (show a toggle)
     */
    isCollapsed           : PropTypes.bool,
    /**
     *  Allow module to be removed (show a “Delete” button)
     */
    isDeletable           : PropTypes.bool,
    /**
     *  Display loading state
     */
    isLoading             : PropTypes.bool,
    /**
     *  Readonly state
     */
    isReadOnly            : PropTypes.bool,
    /**
     *  Header level in the document outline
     */
    headerLevel           : PropTypes.oneOf( [ 2, 3, 4 ] ),
    /**
     *  Display as error/invalid
     */
    hasError              : PropTypes.bool,
    /**
     *  Display whole module as error/invalid
     */
    hasModuleError        : PropTypes.bool,
    /**
     *  Tooltip message text (string or JSX)
     */
    errorMessage          : PropTypes.node,
    /**
     *  Tooltip is displayed
     */
    errorMessageIsVisible : PropTypes.bool,
    /**
     *  Override the headerLevel for a custom built header
     */
    customHeader          : PropTypes.node,
    /**
     *  Header click callback function
     */
    onClickHeader         : PropTypes.func,
    /**
     *  Toggle button click callback function
     */
    onClickToggle         : PropTypes.func,
    /**
     *  Delete button onClick callback function
     */
    onClickDelete         : PropTypes.func,
    /**
      *  Error icon mouse over callback function
      */
    onMouseOutError       : PropTypes.func,
    /**
      *  Error icon mouse out callback function
      */
    onMouseOverError      : PropTypes.func,
    /**
      *  Header mouse over callback function
      */
    onMouseOutHeader      : PropTypes.func,
    /**
      *  Header mouse out callback function
      */
    onMouseOverHeader     : PropTypes.func,
};

Module.defaultProps =
{
    cssMap        : styles,
    headerLevel   : 2,
    isCollapsed   : false,
    isCollapsible : false,
    isDeletable   : false,
    isLoading     : false,
    isReadOnly    : false,
};

export default Module;
