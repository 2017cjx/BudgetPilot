import asyncHandler from '../middlewares/async';
import { UserUsecase } from '../usecases/users';
import { appResponse } from '../utils/appResponse';
import { ErrorResponse } from '../utils/errorResponse';
import { comparePassword, hashPassword } from '../utils/hash';
import { generateToken } from '../utils/jwt';
import { forgetPass, loginUser, registerUser, resetPass } from '../validator/user';

export const register = asyncHandler(async (req, res, next) => {
  const { error, value } = registerUser.validate(req.body);

  if (error) {
    throw next(new ErrorResponse(error.details[0].message, 400));
  }

  const { username, email, password } = value;

  const existingUser = await UserUsecase.userByEmail(email);

  if (existingUser) {
    throw next(new ErrorResponse('Email already exists', 400));
  }

  const hashedPassword = await hashPassword(password);

  const newToken = await generateToken(email, username);

  const user: any = {
    username,
    email,
    password: hashedPassword,
    token: newToken
  }

  const newUser = await UserUsecase.create(user);

  return appResponse(res, 201, 'User registered successfully', newUser);
})

export const login = asyncHandler(async (req, res, next) => {
  const { error, value } = loginUser.validate(req.body);

  if (error) {
    throw next(new ErrorResponse(error.details[0].message, 400));
  }

  const { email, password } = value;

  const user = await UserUsecase.userByEmail(email);

  if (!user) {
    throw next(new ErrorResponse('Invalid Credentials', 404));
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = await generateToken(user.email, user.username);

  user.token = token
  await user.save()

  return appResponse(res, 200, 'Login successful', { user, token });
});

export const forgetPassword = asyncHandler(async (req, res, next) => {
  const { error, value } = forgetPass.validate(req.body);

  if (error) {
    throw next(new ErrorResponse(error.details[0].message, 400));
  }

  const user = await UserUsecase.userByEmail(value);

  if (!user) {
    throw next(new ErrorResponse('User not found', 404));
  }

  const resetToken = await generateToken(user.username, user.email);

  // const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  
  // Would add email logic later
  // await sendEmail(user.email, 'Password Reset', `Click the link to reset your

  return appResponse(res, 200, 'Password reset link sent to your email', { 
    // Remember to remove this when deploying
    resetToken });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const token = req.query;

  if (!token) {
    throw next(new ErrorResponse('Token is required', 400));
  }

  const { error, value } = resetPass.validate(req.body);

  if (error) {
    throw next(new ErrorResponse(error.details[0].message, 400));
  }

  const { email, newPassword, confirmPassword } = value;

  if (newPassword !== confirmPassword) {
    throw next(new ErrorResponse('New password and confirm password must match', 400));
  }

  const user = await UserUsecase.userByEmail(email);

  if (!user || !user.password) {
    throw next(new ErrorResponse('User not found', 404));
  }

  const hashedPassword = await hashPassword(newPassword);

  user.password = hashedPassword;

  await user.save();

  return appResponse(res, 200, 'Password reset successfully');
});
