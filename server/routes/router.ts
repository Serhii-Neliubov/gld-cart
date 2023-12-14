import express, {Router} from "express";
import * as userController from "../controllers/userController";
import {rateLimitMiddlewareTyped} from "../middlewares/rateLimitMiddleware";
import * as paymentController from "../controllers/paymentController";
import * as authMiddleware from "../middlewares/authMiddleware";
import * as vehicleController from "../controllers/vehicleController";

const router: Router = Router();

// Auth routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);

//GoogleAuth routes
router.get("/tokens/oauth/google", userController.googleOauthHandler);

// Reset password routes
router.post("/forgot-password", userController.initiatePasswordReset);
router.post("/reset-password/:token", userController.resetPasswordWithToken);
router.post("/reset-password", userController.resetPasswordWithEmail);

//Email routes
router.post("/send-contact-email", rateLimitMiddlewareTyped, userController.sendContactEmail);

//Payment routes
router.post("/create-checkout-session", authMiddleware.requireAuth, paymentController.createPaymentCheckout);
router.post("/create-subscription-checkout", paymentController.createSubscriptionCheckout);
router.post("/cancel-subscription", authMiddleware.requireAuth, paymentController.cancelSubscription);
router.get("/get-customer", authMiddleware.requireAuth, paymentController.createCustomer);
router.post("/webhook", express.raw({type: "application/json"}), paymentController.handleStripeWebhook);

//Addresses routes
router.post("/add-address", userController.addAddress);
router.put("/update-address", userController.updateAddress);

//Basic product routes
// router.post("/create-product", authMiddleware.requireAuth, storeController.create_product);
// router.post("/update-product", authMiddleware.requireAuth, storeController.update_product);
// router.post("/delete_product", authMiddleware.requireAuth, storeController.delete_product);
// router.get("/get_product", authMiddleware.requireAuth, storeController.get_product);

//Vehicle routes
router.post('/vehicle', authMiddleware.requireAuth, vehicleController.createVehicle);
router.get('/vehicles/:id', authMiddleware.requireAuth, vehicleController.getVehicleById);
router.get('/vehicles', authMiddleware.requireAuth, vehicleController.getAllVehicles);
router.put('/vehicles/:id', authMiddleware.requireAuth, vehicleController.updateVehicle);
router.delete('/vehicles/:id', authMiddleware.requireAuth, vehicleController.deleteVehicle);

export default router;
