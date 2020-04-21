/**
 * Determines the display name of a component
 * https://reactjs.org/docs/higher-order-components.html
 */
export function getDisplayName(Component) {
  return Component.displayName || Component.name || "Component";
}

/**
 * Creates a higher-order component with the given name.
 */
export function higherOrderComponent(name, createWrapper) {
  return (Component) => {
    const Wrapper = createWrapper(Component);
    Wrapper.displayName = `${name}(${getDisplayName(Component)})`;
    return Wrapper;
  };
}

