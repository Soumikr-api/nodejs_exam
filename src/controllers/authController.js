import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRETKEY,
      { expiresIn: "1h" }
    )

    res.json({ token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
