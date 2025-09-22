import jwt from 'jsonwebtoken'

const verifyToken = async (req, res, next) => {
  let token = null
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({
      status: 'fail',
      message: 'Access token not provided'
    })
  }

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1]
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // ✅ pastikan req.user selalu punya _id
    req.user = {
      _id: decoded._id || decoded.id, // bisa dua-duanya
      email: decoded.email || null,
      role: decoded.role || null
    }

    if (!req.user._id) {
      return res.status(401).json({
        status: 'fail',
        message: 'Unauthorized: user not found in token'
      })
    }

    next()
  } catch (error) {
    return res.status(403).json({
      status: 'fail',
      message: 'Invalid or expired access token',
      error: error.message
    })
  }
}

export default verifyToken
