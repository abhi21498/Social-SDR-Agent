class Registry:
    """Simple registry for services."""
    def __init__(self):
        self._registry = {}

    def register(self, name, obj):
        self._registry[name] = obj

    def get(self, name):
        return self._registry.get(name)

    def has(self, name):
        return name in self._registry

    def list(self):
        return list(self._registry.keys())