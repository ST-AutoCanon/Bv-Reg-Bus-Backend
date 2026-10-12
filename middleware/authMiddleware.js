// const jwt = require("jsonwebtoken");
// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// exports.authenticateTokenMiddleWare = async (req, res, next) => {
//   console.log(`authenticating user for token: ${req.headers["authorization"]}`);
//   const authHeader = req.headers["authorization"];
//   const accessToken = authHeader && authHeader.split(" ")[1];
//   console.log(`accessToken:${accessToken}`);
//   if (!accessToken) {
//     res.sendStatus(401);
//   } else {
//     jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, payload) => {
//       if (err) {
//         console.error(`Error occured while verifying token: ${err}`);
//         res.sendStatus(403);
//       } else {
//         req.user = payload.tokenBody
//         next()
//       }
//     });
//   }
// };

const jwt = require("jsonwebtoken");
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

exports.authenticateTokenMiddleWare = async (req, res, next) => {
  console.log(`Authenticating user for token: ${req.headers["authorization"]}`);
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  console.log(`AccessToken: ${accessToken}`);

  if (!accessToken) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.error("Token has expired");
        return res.status(403).json({ error: "Token has expired" });
      } else {
        console.error(`Error occurred while verifying token: ${err}`);
        return res.status(403).json({ error: "Token is invalid" });
      }
    }
    const tokenBody = payload.tokenBody;
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const expirationTime = payload.exp; // Expiration time from token (in seconds)

    // Check if the token is nearing expiration (less than 3 minutes remaining)
    if (expirationTime - currentTime < 3 * 60) {
      console.log("Extending token expiration time...");
      const newAccessToken = jwt.sign(
        { tokenBody },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m" } // Extend token validity for another 5 minutes
      );

      // Send the new token in the response headers
      res.setHeader("x-new-token", newAccessToken);
    }

    req.user = tokenBody; // Attach user data to the request object
    next();
  });
};