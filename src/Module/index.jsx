/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';
import {
    Card,
    H2,
    H3,
    H4,
    IconButton,
    IconWithTooltip,
} from '../index';

const headers = { 2: H2, 3: H3, 4: H4 };


export default class Module extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
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

    static defaultProps =
    {
        headerLevel   : 2,
        isCollapsed   : false,
        isCollapsible : false,
        isDeletable   : false,
        isLoading     : false,
        isReadOnly    : false,
    };

    static displayName = 'Module';

    constructor( props )
    {
        super( props );

        this.handleClickDelete = this.handleClickDelete.bind( this );
        this.handleClickToggle = this.handleClickToggle.bind( this );
    }

    handleClickToggle( e )
    {
        e.stopPropagation();
        const { onClickToggle } = this.props;
        if ( onClickToggle )
        {
            onClickToggle( e );
        }
    }

    handleClickDelete( e )
    {
        e.stopPropagation();
        const { onClickDelete } = this.props;
        if ( onClickDelete )
        {
            onClickDelete( e );
        }
    }

    render()
    {
        const {
            children,
            className,
            cssMap = createCssMap( this.context.Module, this.props ),
            customHeader,
            errorMessage,
            errorMessageIsVisible,
            hasError,
            hasModuleError,
            headerLevel,
            isCollapsed,
            isCollapsible,
            isDeletable,
            isLoading,
            isReadOnly,
            onClickHeader,
            onMouseOutError,
            onMouseOutHeader,
            onMouseOverError,
            onMouseOverHeader,
            title,
        } = this.props;

        let header;
        if ( customHeader )
        {
            header = (
                <header
                    className    = { cssMap.header }
                    onClick      = { onClickHeader }
                    onMouseOut   = { onMouseOutHeader }
                    onMouseOver  = { onMouseOverHeader }>
                    { customHeader }
                </header>
            );
        }
        else if ( title )
        {
            const ModuleHeader = headers[ headerLevel ];

            header = (
                <header
                    className      = { cssMap.header }
                    onClick        = { onClickHeader }
                    onMouseOut     = { onMouseOutHeader }
                    onMouseOver    = { onMouseOverHeader }>
                    <div className = { cssMap.title }>
                        <ModuleHeader>{ title }</ModuleHeader>
                    </div>
                    <div className = { cssMap.controls }>
                        { !!errorMessage && hasError &&
                            <IconWithTooltip
                                iconType         = "error"
                                message          = { errorMessage }
                                noWarn
                                onMouseOut       = { onMouseOutError }
                                onMouseOver      = { onMouseOverError }
                                tooltipIsVisible = { errorMessageIsVisible } />
                        }
                        { isDeletable &&
                            <IconButton
                                iconType   = "delete"
                                isReadOnly = { isReadOnly }
                                onClick    = { this.handleClickDelete }>
                                Delete
                            </IconButton>
                        }
                        { isCollapsible &&
                            <IconButton
                                iconType  = { isCollapsed ? 'down' : 'up' }
                                onClick   = { this.handleClickToggle }>
                                { isCollapsed ? 'Show' : 'Hide' }
                            </IconButton>
                        }
                    </div>
                </header>
            );
        }

        return (
            <Card
                className = { cssMap.main }
                padding   = "none">
                { header }
                { ( !isCollapsible || !isCollapsed ) &&
                    <div className = { cssMap.content }>
                        { children }
                    </div>
                }
                { isLoading  && <div className = { cssMap.loadingOverlay } /> }
            </Card>
        );
    }
}
