class Registry:
    def __init__(self):
        self._registry = {}

    def register(self, name, component):
        """Register a component by name."""
        self._registry[name] = component

    def get(self, name):
        """Get a component by name."""
        return self._registry.get(name)

    def has(self, name):
        """Check if a component is registered."""
        return name in self._registry