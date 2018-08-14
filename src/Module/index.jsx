import React, { Component }                  from 'react';
import PropTypes                             from 'prop-types';

import { buildClassName }                    from '../utils';
import H2                                    from '../H2';
import H3                                    from '../H3';
import H4                                    from '../H4';
import { Card, IconButton, IconWithTooltip } from '../index';

const headers = { 2: H2, 3: H3, 4: H4 };


export default class Module extends Component
{
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
        isCollapsible : false,
        isCollapsed   : false,
        isDeletable   : false,
        isLoading     : false,
        isReadOnly    : false,
        headerLevel   : 2,
        cssMap        : require( './module.css' ),
    };

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
            cssMap,
            className,
            isCollapsed,
            isCollapsible,
            isDeletable,
            isLoading,
            isReadOnly,
            children,
            customHeader,
            headerLevel,
            hasError,
            hasModuleError,
            errorMessage,
            errorMessageIsVisible,
            onClickHeader,
            onMouseOutError,
            onMouseOverError,
            onMouseOutHeader,
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
                                message          = { errorMessage }
                                iconType         = "error"
                                tooltipIsVisible = { errorMessageIsVisible }
                                onMouseOut       = { onMouseOutError }
                                onMouseOver      = { onMouseOverError } />
                        }
                        { isDeletable &&
                            <IconButton
                                iconType   = "delete"
                                onClick    = { this.handleClickDelete }
                                isReadOnly = { isReadOnly }>
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
                className = { buildClassName( className, cssMap, {
                    collapsible : isCollapsible,
                    collapsed   : isCollapsible && isCollapsed,
                    error       : hasError,
                    moduleError : hasModuleError,
                    level       : headerLevel,
                } ) }>
                { header }
                { ( !isCollapsible || !isCollapsed ) &&
                <div className = { cssMap.content }>
                    { children }
                </div>
                }
                { isLoading  &&
                <div className = { cssMap.loadingOverlay } />
                }
            </Card>
        );
    }
}
