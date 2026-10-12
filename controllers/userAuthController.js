

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../mongoSchemas/userProfileSchema")
const { forgotPassword } = require("../services/userProfileService")
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

/**
 * 
 * to be used only for creating admin user
 * @param {*} req 
 * @param {*} res 
 */
exports.signUp = async (req, res) => {
  try {
    const reqBody = req.body
    // { username, password, role, profileAddress, typeOfBusiness, businessName, registrationDate, registrationNumber,  }
    const hashedPassword = await bcrypt.hash(reqBody.password, 10)
    reqBody.emailId = reqBody.username
    reqBody.password = hashedPassword
    reqBody.role = "admin"
    const newUser = await User.create(reqBody)
    if (newUser && newUser != null) {

      const { _id, username, role } = newUser
      const tokenBody = {
        _id,
        username,
        role,
      }
      const accessToken = jwt.sign({ tokenBody }, ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
      res.status(201).json({
        status: "success",
        body: `user created with username: ${newUser.username}`,
        accessToken,
      })
    }
  } catch (error) {
    console.error(`error while signup: ${error}`)
    res.status(200).json({
      status: "failure",
      body: `error while signup: ${error}`,
    })
  }
}

// exports.signin = async (req, res) => {
//   const { username, password } = req.body
//   try {
//     const user = await User.findOne({ username })
//     if (!user) {
//       console.error(`could not find the user with username: ${username}`)
//       res.status(200).json({
//         status: "failure",
//         body: `could not find the user with username: ${username}`,
//       })
//     } else {
//       const passwordMatched = await bcrypt.compare(password, user.password)
//       if (passwordMatched) {
//         console.log(`user signin success with username: ${user.username}`)
//         const { _id, username, role, status, businessName } = user
//         const tokenBody = {
//           _id,
//           username,
//           role,
//           status,
//           businessName
//         }
//         const accessToken = jwt.sign({ tokenBody }, ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
//         res.status(201).json({
//           status: "success",
//           accessToken,
//           userStatus: status,
//         })
//       } else {
//         res.status(200).json({
//           status: "failure",
//           body: `incorrect pasword for username: ${user.username}`,
//         })
//       }
//     }
//   } catch (error) {
//     console.error(`error while signin: ${error}`)
//     res.status(200).json({
//       status: "failure",
//       body: `error while signin: ${error}`,
//     })
//   }
// }



// exports.signin = async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Find user by username or username1
//     // const user = await User.findOne({
//     //   $or: [{ username }, { username1: username }],
//     // });
//     const user = await User.findOne({ username });
//     if (!user) {
//       console.error(`Could not find the user with username: ${username}`);
//       return res.status(200).json({
//         status: "failure",
//         body: `Could not find the user with username: ${username}`,
//       });
//     }

//     // Determine which username matched
//     // const matchedUsername = user.username === username ? user.username : user.username1;

//     // Compare the provided password with the stored hashed password
//     const passwordMatched = await bcrypt.compare(password, user.password);
//     if (passwordMatched) {
//       // console.log(`User sign-in success with username: ${matchedUsername}`);
//       console.log(`User sign-in success with username: ${username}`);
//       const { _id, role, status, businessName } = user;
//       const tokenBody = {
//         _id,
//         // username: matchedUsername, // Use only the matched username
//         username,
//         role,
//         status,
//         businessName,
//       };
//       const accessToken = jwt.sign({ tokenBody }, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

//       return res.status(201).json({
//         status: "success",
//         accessToken,
//         userStatus: status,
//       });
//     } else {
//       return res.status(200).json({
//         status: "failure",
//         // body: `Incorrect password for username: ${matchedUsername}`,
//         body: `Incorrect password for username: ${username}`,
//       });
//     }
//   } catch (error) {
//     console.error(`Error while signin: ${error}`);
//     return res.status(200).json({
//       status: "failure",
//       body: `Error while signin: ${error}`,
//     });
//   }
// };

exports.signin = async (req, res) => {

  const { username, password } = req.body;
  // console.log('req.body;;:',req.body);
  try {
    // Find user by username or username1
    // const user = await User.findOne({
    //   $or: [{ username }, { username1: username }],
    // });
    const user = await User.findOne({ username });
    if (!user) {
      console.error(`Could not find the user with username: ${username}`);
      return res.status(200).json({
        status: "failure",
        body: `Could not find the user with username: ${username}`,
      });
    }

    // Determine which username matched
    // const matchedUsername = user.username === username ? user.username : user.username1;

    // Compare the provided password with the stored hashed password
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) {
      // console.log(`User sign-in success with username: ${matchedUsername}`);
      // console.log(`User sign-in success with username: ${username}`);
     
      const { _id, role, status, businessName } = user;


      const tokenBody = {
        _id,
        // username: matchedUsername, // Use only the matched username
        username,
        role,
        status,
        businessName,
      };
      const accessToken = jwt.sign({ tokenBody }, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });

      return res.status(201).json({
        status: "success",
        accessToken,
        userStatus: status,
        vehicleType: user.vehicleType,
      });
    } else {
      return res.status(200).json({
        status: "failure",
        // body: `Incorrect password for username: ${matchedUsername}`,
        body: `Incorrect password for username: ${username}`,
      });
    }
  } catch (error) {
    console.error(`Error while signin: ${error}`);
    return res.status(200).json({
      status: "failure",
      body: `Error while signin: ${error}`,
    });
  }
};

// New user Reset Password flow
exports.resetPassword = async (req, res) => {
  try {
    const { userId, username, password } = req.body
    const user = await User.findById(userId)
    if (user == null) {
      throw new Error(`user with username: ${username} not found`)
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate(userId, { password: hashedPassword, status: "active" })
    res.status(200).json({
      status: "success",
      message: `password updated for user: ${username}`,
    })
  } catch (error) {
    console.error(`error while resetPassword: ${error}`)
    res.status(200).json({
      status: "failure",
      body: `error while resetPassword: ${error}`,
    })
  }
}

//Existing user Forgot Password flow
exports.forgotPassword = async (req, res) => {
  try {
    const { username } = req.body
    const user = await User.findOne({username})
    if (user == null) {
      throw new Error(`user with username: ${username} not found`)
    }
    await forgotPassword(user)
    console.error(`Password has been reset for user: ${username}`)
    res.status(200).json({
      status: "success",
      message: `Your password has been reset. Please check your email.`,
    })
  } catch (error) {
    console.error(`error while forgotpassword: ${error}`)
    res.status(200).json({
      status: "failure",
      body: `error while forgotpassword: ${error}`,
    })
  }
}