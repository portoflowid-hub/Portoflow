import mongoose from 'mongoose'
import Course from '../models/Course.js'
import Enrollment from '../models/Enrollment.js'

// —— Course management ——

// GET /api/courses
export const getAllCourses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      q = '',
      tags,
      level,
      isPublished,
      sort = '-createdAt'
    } = req.query

    const skip = (Number(page) - 1) * Number(limit)
    const filter = {}

    if (q) filter.$text = { $search: q }
    if (tags) filter.tags = { $in: tags.split(',').map(t => t.trim()) }
    if (level) filter.level = level
    if (typeof isPublished !== 'undefined')
      filter.isPublished = isPublished === 'true'

    const courses = await Course.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit))
      .populate('createdBy', 'username email')
      .lean()

    const courseIds = courses.map(c => c._id)

    // batch student counts
    const counts = await Enrollment.aggregate([
      {
        $match: {
          course: { $in: courseIds },
          role: 'student',
          status: 'enrolled'
        }
      },
      { $group: { _id: '$course', count: { $sum: 1 } } }
    ])

    const countMap = counts.reduce((m, r) => {
      m[r._id.toString()] = r.count
      return m
    }, {})

    let userEnrolledMap = {}
    if (req.user?.id) {
      const userEnrolls = await Enrollment.find({
        user: req.user.id,
        course: { $in: courseIds },
        status: 'enrolled'
      })
        .select('course')
        .lean()
      userEnrolledMap = userEnrolls.reduce((m, e) => {
        m[e.course.toString()] = true
        return m
      }, {})
    }

    const enriched = courses.map(c => ({
      ...c,
      studentCount: countMap[c._id.toString()] || 0,
      isEnrolled: !!userEnrolledMap[c._id.toString()]
    }))

    const total = await Course.countDocuments(filter)

    res.status(200).json({
      status: 'success',
      data: enriched,
      meta: { total, page: Number(page), limit: Number(limit) }
    })
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
}

// GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id))
      return res
        .status(400)
        .json({ status: 'fail', message: 'Invalid course id' })

    const course = await Course.findById(id)
      .populate('createdBy', 'username email')
      .lean()

    if (!course)
      return res
        .status(404)
        .json({ status: 'fail', message: 'Course not found' })

    const studentCount = await Enrollment.countDocuments({
      course: id,
      role: 'student',
      status: 'enrolled'
    })

    const isEnrolled = req.user?.id
      ? !!(await Enrollment.findOne({
          course: id,
          user: req.user.id,
          status: 'enrolled'
        }).select('_id'))
      : false

    res.status(200).json({
      status: 'success',
      data: { ...course, studentCount, isEnrolled }
    })
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
}

// POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const {
      title,
      description = '',
      price = 0,
      capacity,
      tags = [],
      category = '',
      level = 'beginner',
      language,
      imageUrl,
      isPublished
    } = req.body

    if (!title) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Title is required' })
    }

    const course = await Course.create({
      title,
      description,
      price,
      createdBy: req.user.id,
      capacity: capacity ?? null,
      tags,
      category,
      level,
      language,
      imageUrl,
      isPublished: !!isPublished
    })

    const created = await Course.findById(course._id).populate(
      'createdBy',
      'username email'
    )

    res
      .status(201)
      .json({ status: 'success', message: 'Course created', data: created })
  } catch (err) {
    if (err.code === 11000)
      return res
        .status(400)
        .json({ status: 'fail', message: 'Duplicate field' })
    res.status(500).json({ status: 'error', message: err.message })
  }
}

// PUT /api/courses/:id
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params
    const updates = { ...req.body }

    delete updates.createdBy // jangan ubah pembuat kursus

    // if capacity decreased, check jumlah student
    if (typeof updates.capacity !== 'undefined' && updates.capacity !== null) {
      const currentEnrolled = await Enrollment.countDocuments({
        course: id,
        role: 'student',
        status: 'enrolled'
      })
      if (updates.capacity < currentEnrolled) {
        return res.status(400).json({
          status: 'fail',
          message: `Capacity cannot be less than current enrolled (${currentEnrolled})`
        })
      }
    }

    const course = await Course.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    }).populate('createdBy', 'username email')

    if (!course) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Course not found' })
    }

    res
      .status(200)
      .json({ status: 'success', message: 'Course updated', data: course })
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message)
      return res.status(400).json({ status: 'fail', errors })
    }
    res.status(500).json({ status: 'error', message: err.message })
  }
}

// DELETE /api/courses/:id
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Course.findByIdAndDelete(id)
    if (!deleted) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Course not found' })
    }

    await Enrollment.deleteMany({ course: id })

    res.status(200).json({ status: 'success', message: 'Course deleted' })
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
}

// GET /api/courses/:id/students
export const listCourseStudents = async (req, res) => {
  try {
    const { id } = req.params
    const { page = 1, limit = 30 } = req.query
    const skip = (Number(page) - 1) * Number(limit)

    const filter = { course: id, role: 'student', status: 'enrolled' }

    const [rows, total] = await Promise.all([
      Enrollment.find(filter)
        .populate('user', 'fullName username email avatarUrl')
        .sort({ enrolledAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Enrollment.countDocuments(filter)
    ])

    res.status(200).json({
      status: 'success',
      data: rows,
      meta: { total, page: Number(page), limit: Number(limit) }
    })
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
}
