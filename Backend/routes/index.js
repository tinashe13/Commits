import Auth from './auth.js';
import {Verify ,  VerifyRole } from '../middleware/verify.js'; // Import middleware

export const Router = (server, app) => {
  // Home route
  server.get("/", (req, res) => {
    try {
      res.status(200).json({
        status: "success",
        data: [],
        message: "Welcome to our API homepage!",
      });
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  });

  // Auth routes
  server.use('/auth', Auth);

  //  Protected user route
  server.get("/user", Verify, (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Welcome to your Dashboard!",
    });
  });

  server.get("/admin", Verify, VerifyRole, (req, res) =>{
    res.status(200).json({
      status: "success",
      message: "Welcome to the Admin portal"
    })
  })
};

export default Router;
