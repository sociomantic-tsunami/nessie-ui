const eventHandler = ( func, ...rest ) =>
    func && ( ( ...args ) => func( ...args, ...rest ) );

export { eventHandler };
export default { eventHandler };
