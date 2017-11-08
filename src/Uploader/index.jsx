import React            from 'react';
import PropTypes        from 'prop-types';

import Css              from '../hoc/Css';
import Component        from '../proto/Component';
import Button           from '../Button';
import IconWithTooltip  from '../IconWithTooltip';
import Spinner          from '../Spinner';
import IconButton       from '../IconButton';
import Tooltip          from '../Tooltip';
import Label            from '../Label';
import Icon             from '../Icon';
import Text             from '../Text';

export default class Uploader extends Component
{
    static propTypes =
    {
        /**
        *  Label text
        */
        label       : PropTypes.string,
        /**
        *  “Upload” Button text
        */
        buttonLabel : PropTypes.string,
        /**
        *  Uploader state
        */
        uploadState : PropTypes.oneOf( [
            'default',
            'uploading',
            'uploaded'
        ] ),
        /**
        *  Display as disabled
        */
        isDisabled              : PropTypes.bool,
        /**
        *  Display as read-only
        */
        isReadOnly              : PropTypes.bool,
        /**
        *  Display as error/invalid
        */
        hasError                : PropTypes.bool,
        /**
        *  Tooltip error message text (string or JSX)
        */
        errorMessage            : PropTypes.node,
        /**
        *  Display as warning ( adds warning icon )
        */
        hasWarning              : PropTypes.bool,
        /**
        *  Tooltip warning message text (string or JSX)
        */
        warningMessage          : PropTypes.node,
        /**
         * Error or warning tooltip is visible
         */
        tooltipIsVisible        : PropTypes.bool,
        /**
         * Preview tootltip messsage text (string or JSX)
         */
        previewTooltipMessage   : PropTypes.node,
        /**
         * Preview tootltip is visible
         */
        previewTooltipIsVisible : PropTypes.bool,
        /**
         * Preview button is disabled
         */
        previewisDisabled       : PropTypes.bool,
        /**
         * onClick callback function: ( e ) => { ... }
         */
        onClickPreview          : PropTypes.func,
        /**
         * onClickDelete callback function: ( e ) => { ... }
         */
        onClickDelete           : PropTypes.func,
        /**
         * onChange callback function: ( e ) => { ... }
         */
        onChange                : PropTypes.func,
        /**
        *  Error message position relative to the icon
        */
        errorMessagePosition    : PropTypes.oneOf( [
            'left',
            'right',
            'top',
            'bottom',
            'topLeft',
            'topRight' ] )
    };

    static defaultProps =
    {
        uploadState             : 'default',
        hasError                : false,
        hasWarning              : false,
        tooltipIsVisible        : false,
        errorMessagePosition    : 'top',
        isDisabled              : false,
        isReadOnly              : false,
        previewTooltipIsVisible : false,
        buttonLabel             : 'Upload',
        cssMap                  : require( './uploader.css' )
    };

    render()
    {
        const {
            buttonLabel,
            className,
            cssMap,
            errorMessage,
            hasError,
            hasWarning,
            isDisabled,
            isReadOnly,
            label,
            onChange,
            onClickPreview,
            onClickDelete,
            previewisDisabled,
            previewTooltipIsVisible,
            previewTooltipMessage,
            tooltipIsVisible,
            errorMessagePosition,
            uploadState,
            warningMessage
        } = this.props;

        const { id } = this.state;

        const buttonRole = 'default';
        let   hasTooltip = false;
        let   uploaded   = false;
        let   isLoading  = false;
        let   iconType   = 'upload';

        let uploaderButtonClass = cssMap.uploadButton;
        let messageType;
        let message;


        if ( uploadState === 'uploading' )
        {
            isLoading  = true;
            iconType   = '';
            uploaderButtonClass = cssMap.uploaderButton;
        }
        else if ( uploadState === 'uploaded' )
        {
            uploaded   = true;
            iconType   = '';
            isLoading  = false;
            uploaderButtonClass = cssMap.uploaderButton;
        }


        if ( hasWarning )
        {
            hasTooltip  = true;
            messageType = 'alert';
            message     = warningMessage;
        }
        if ( hasError )
        {
            hasTooltip  = true;
            messageType = 'error';
            message     = errorMessage;
        }

        const fakeUploadButton = (
            <label
                className = { cssMap.fakeButton }
                htmlFor   = { isReadOnly ? undefined : id  }>
                <div className = { cssMap.fakeButtonIconContainer }>
                    <Icon type = "upload" theme = "button" />
                </div>
                <div className = { cssMap.fakeButtonTextContainer }>
                    <Text className = { cssMap.fakeButtonText }>
                        { buttonLabel }
                    </Text>
                </div>
            </label>
        );


        return (
            <Css
                cssMap = { cssMap }
                cssProps = { {
                    uploaded,
                    loading         : isLoading,
                    disabled        : isDisabled,
                    previewDisabled : previewisDisabled
                } }>
                <div className = { className }>
                    <input
                        id        = { id }
                        type      = "file"
                        name      = { `${id}-file` }
                        className = { cssMap.input }
                        onChange  = { onChange } />
                    { label &&
                        <Label
                            overflowIsHidden
                            htmlFor    = { `${id}-file` }
                            isDisabled = { isDisabled }>
                            { label }
                        </Label>
                    }
                    <IconWithTooltip
                        className        = { cssMap.iconWithTooltip }
                        iconType         = { messageType }
                        iconPosition     = "topRight"
                        message          = { message }
                        iconIsVisible    = { hasTooltip }
                        tooltipPosition  = { errorMessagePosition }
                        tooltipIsVisible = { tooltipIsVisible }>
                        <div className = { cssMap.buttonsContainer }>
                            { uploadState === 'default' ? fakeUploadButton :
                                <Tooltip
                                    isVisible = { uploadState === 'uploaded' &&
                                                  previewTooltipIsVisible }
                                    message   = { previewTooltipMessage }
                                    className = { cssMap.previewTooltip }>
                                    <Button
                                        role       = { buttonRole }
                                        className  = { uploaderButtonClass }
                                        onClick    = { onClickPreview }
                                        isDisabled = { isDisabled }
                                        isReadOnly = { isReadOnly }
                                        iconType   = { iconType }>
                                        { buttonLabel }
                                    </Button>
                                </Tooltip>
                            }
                            { isLoading &&
                                <div className = { cssMap.loadingOverlay }>
                                    <Spinner className = { cssMap.spinner } />
                                </div>
                            }
                            { uploaded  &&
                                <IconButton
                                    className  = { cssMap.uploadedButton }
                                    onClick    = { onClickDelete }
                                    isDisabled = { isDisabled }
                                    isReadOnly = { isReadOnly }
                                    iconType   = "delete"
                                    iconTheme  = "button" />
                            }
                        </div>
                    </IconWithTooltip>
                </div>
            </Css>
        );
    }
}
