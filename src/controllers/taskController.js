import Task from "../models/task.js"

export const createTask = async (req, res) => {
  const { title, description } = req.body

  try {
    const task = await Task.create({
      title,
      description,
      user: req.user
    })

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
