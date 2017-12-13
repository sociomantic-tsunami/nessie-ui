import React, { Component }            from 'react';
import PropTypes                       from 'prop-types';

import Css                             from '../hoc/Css';
import H2                              from '../H2';
import H3                              from '../H3';
import H4                              from '../H4';
import { IconButton, IconWithTooltip } from '../index';

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
        *  Error tooltip bound to error icon onMouseOut callback function
        */
        onMouseOutError       : PropTypes.func,
        /**
        *  Error tooltip bound to error icon onMouseOver callback function
        */
        onMouseOverError      : PropTypes.func,
        /**
        *  Error tooltip bound to header onMouseOut callback function
        */
        onMouseOutHeader      : PropTypes.func,
        /**
         *  Error tooltip bound to header onMouseOver callback function
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
        cssMap        : require( './module.css' )
    };

    constructor( props )
    {
        super( props );

        this.handleClickDelete = this.handleClickDelete.bind( this );
        this.handleClickToggle = this.handleClickToggle.bind( this );
        this.handleOnMouseOverHeader = this.handleOnMouseOverHeader.bind( this );
        this.handleOnMouseOutHeader = this.handleOnMouseOutHeader.bind( this );
        this.handleOnMouseOverError = this.handleOnMouseOverError.bind( this );
        this.handleOnMouseOutError = this.handleOnMouseOutError.bind( this );
    }

    handleOnMouseOverHeader( e )
    {
        e.stopPropagation();
        const { onMouseOverHeader } = this.props;
        if ( onMouseOverHeader )
        {
            onMouseOverHeader( e );
        }
    }


    handleOnMouseOutHeader( e )
    {
        e.stopPropagation();
        const { onMouseOutHeader } = this.props;
        if ( onMouseOutHeader )
        {
            onMouseOutHeader( e );
        }
    }

    handleOnMouseOverError( e )
    {
        e.stopPropagation();
        const { onMouseOverError } = this.props;
        if ( onMouseOverError )
        {
            onMouseOverError( e );
        }
    }

    handleOnMouseOutError( e )
    {
        e.stopPropagation();
        const { onMouseOutError } = this.props;
        if ( onMouseOutError )
        {
            onMouseOutError( e );
        }
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
                    className   = { cssMap.header }
                    onClick     = { onClickHeader }
                    onMouseOut  = { onMouseOutError }
                    onMouseOver = { onMouseOverError }>
                    { customHeader }
                </header>
            );
        }
        else if ( title )
        {
            const ModuleHeader = headers[ headerLevel ];

            header = (
                <header
                    className = { cssMap.header }
                    onClick   = { onClickHeader }>
                    <div className = { cssMap.title }>
                        <ModuleHeader
                            onMouseOut = { this.handleOnMouseOutHeader }
                            onMouseOver = { this.handleOnMouseOverHeader }>
                                { title }
                        </ModuleHeader>
                    </div>
                    <div className = { cssMap.controls }>
                        { !!errorMessage && hasError &&
                            <IconWithTooltip
                                message          = { errorMessage }
                                iconType         = "error"
                                tooltipIsVisible = { errorMessageIsVisible }
                                onMouseOut       = { this.handleOnMouseOutError }
                                onMouseOver      = { this.handleOnMouseOverError } />
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
            <Css
                cssMap   = { cssMap }
                cssProps = { {
                    collapsible     : isCollapsible,
                    collapsed       : isCollapsible && isCollapsed,
                    error           : hasError,
                    moduleError     : hasModuleError
                } }>
                <section className = { className }>
                    { header }
                    { ( !isCollapsible || !isCollapsed ) &&
                        <div className = { cssMap.content }>
                            { children }
                        </div>
                    }
                    { isLoading  &&
                        <div className = { cssMap.loadingOverlay } />
                    }
                </section>
            </Css>
        );
    }
}
