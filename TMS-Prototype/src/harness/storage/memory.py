_tasks = []
_next_id = 1

def create_task(title):
    """Create a new task with the given title.
    Returns a dictionary representing the task.
    """
    global _next_id
    task = {"id": _next_id, "title": title}
    _tasks.append(task)
    _next_id += 1
    return task

def get_tasks():
    """Return a list of all tasks."""
    return _tasks.copy()