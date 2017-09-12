import ClickableComponentDriver from './clickableComponentDriver';

const ERRORS = {
    INPUT_CANNOT_BE_CLICKED : ( label, state ) =>
        `Input '${label}' cannot be clicked since it is ${state}`,
    INPUT_CANNOT_CHANGE_VALUE : ( label, state ) =>
        `Input '${label}' value cannot be changed since it is ${state}`,
    INPUT_CANNOT_PRESS_KEY : ( label, state ) =>
        `Cannot press a key on Input '${label}' since it is ${state}`
};
export default class InputComponentDriver extends ClickableComponentDriver
{
    constructor( wrapper )
    {
        super( wrapper, 'input' );
    }

    /**
     * Simulates a full transaction of value input: focus, value change, blur.
     * This is useful for fields as part of form that require a blur to complete
     * the change of value.
     * In order to set a value on its own please see inputValue()
     * @param {String|Integer} value the value to set.
     * @return {InputComponentDriver} this driver (for chaining commands)
     */
    setInputValue( value )
    {
        checkIfSimulationIsValid( this.wrapper,
                                  ERRORS.INPUT_CANNOT_CHANGE_VALUE );

        const newValue = ( value == null ) ? '' : String( value );
        const $input = this.control;
        this.focus();
        $input.node.value = value;
        $input.simulate( 'change', { target: { value: newValue } } );
        this.blur();

        return this;
    }

    clearInputValue()
    {
        return this.setInputValue( '' );
    }

    /**
     * Deprecated function, please use pressKey Instead.
     * @param {Integer} keyCode the integer code of a key
     * @return {InputComponentDriver} this driver (for chaining commands)
     */
    keyInput( keyCode )
    {
        return this.pressKey( keyCode );
    }

    /**
     * Simulates the pressing of a give key. In case of a printible character
     * the input will be updated accordingly as well.
     * @param {Integer} keyCode the integer code of a key
     * @return {InputComponentDriver} this driver (for chaining commands)
     */
    pressKey( keyCode )
    {
        checkIfSimulationIsValid( this.wrapper, ERRORS.INPUT_CANNOT_PRESS_KEY );

        this.control.simulate( 'keyDown', { which: keyCode } );
        this.control.simulate( 'keyPress', { which: keyCode } );

        if ( isCharPrintable( keyCode ) )
        {
            this.control.node.value += String.fromCharCode( keyCode );
            this.control.simulate( 'change', {
                target : { value: this.control.node.value }
            } );
        }

        this.control.simulate( 'keyUp', { which: keyCode } );
        return this;
    }

    /**
     * Pressing each character of the value one by one.
     * @param {String} value a value press
     * @return {InputComponentDriver} this driver (for chaining commands)
     */
    inputValue( value )
    {
        const FIRST_CHARACTER = 0;
        const keys = value.toString().split( '' );

        keys.forEach( key =>
        {
            const keyCode = key.charCodeAt( FIRST_CHARACTER );
            this.pressKey( keyCode );
        } );

        return this;
    }

    /**
     * the Nessie component can behave as either a controlled or uncontrolled
     * input. This depends on whether you set the value prop (controlled) or
     * defaultValue prop (uncontrolled).
     * In case the Nessie Component is used in a controlled manner, it is
     * possible and recommneded to retreive it through the component's
     * properties.
     * For Uncotrolled value, this function is essential in order to retreive
     * the value.
     * @return {String} the input value
     */
    getInputValue()
    {
        return this.control.node.value;
    }

    click()
    {
        checkIfSimulationIsValid( this.wrapper,
                                  ERRORS.INPUT_CANNOT_BE_CLICKED );

        return super.click();
    }
}

/**
 * Checks the state of the input, and throws an error in case the state is not
 * permiting the simulated action.
 * @param {Object} wrapper - The warpper object that is being simulated.
 * @param {Function} errorIfInvalid - The error to throw in case the object is
 * not avilable for a simulation.
 */
function checkIfSimulationIsValid( wrapper, errorIfInvalid )
{
    const props = wrapper.props();
    const label = props.label;

    if ( props.isDisabled )
    {
        throw new Error( errorIfInvalid( label, 'disabled' ) );
    }
    else if ( props.isReadOnly )
    {
        throw new Error( errorIfInvalid( label, 'read only' ) );
    }
}

/**
 * Checks if a character is printable. (partial black listing of keys)
 * @param {Integer} keyCode the key code to check
 */
function isCharPrintable( keyCode )
{
    const blackList = [
        13, // Enter
    ];

    return !blackList.includes( keyCode );
}
