class AssumptionStore:
    """Thread‑unsafe in‑memory assumption store with simple versioning."""
    def __init__(self):
        self._data = {}
        self._version = 0

    def set(self, key: str, value):
        self._data[key] = value
        self._version += 1

    def get(self, key, default=None):
        return self._data.get(key, default)

    def delete(self, key):
        if key in self._data:
            del self._data[key]
            self._version += 1

    def all(self):
        return dict(self._data)

    def version(self):
        return self._version

    def clear(self):
        self._data.clear()
        self._version = 0