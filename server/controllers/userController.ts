import { Request, Response, NextFunction } from "express";
import MailService from "../services/mail-service";
import UserService from "../services/user-service";
import TokenService from "../services/token-service";
import { v4 as uuidv4 } from 'uuid';
const maxAge: number = 30 * 24 * 60 * 60 * 1000;
import {
  getGoogleOAuthTokens,
  getGoogleUser,
} from "../services/google-service";

export const signup_post = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { type, name, surname, email, password } = req.body;

  try {
    const userData = await UserService.registration(
      type,
      name,
      surname,
      email,
      password
    );
    res.cookie("refreshToken", userData.refreshToken, {
      httpOnly: true,
      maxAge: maxAge,
    });

    res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};

export const login_post = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const userData = await UserService.login(email, password);

    res.cookie("refreshToken", userData.refreshToken, {
      httpOnly: true,
      maxAge: maxAge,
    });

    res.status(201).json(userData);
  } catch (error) {
    next(error);
  }
};

export const logout_post = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    const token = await UserService.logout(refreshToken);
    res.clearCookie("refreshToken");
    return res.json(token);
  } catch (e) {
    next(e);
  }
};

export const initiate_password_reset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  try {
    const token: string = uuidv4();
    await UserService.requestPasswordReset(email, token);
    res
      .status(200)
      .json({ message: "Password reset link was sent to your email." });
  } catch (error) {
    next(error);
  }
};

export const reset_password = async (
  req: Request,
  res: Response,
  next: NextFunction
) : Promise<void> => {
  const { token: token } = req.params;
  const { newPassword } = req.body;
  try {
    await UserService.changePassword(token, newPassword);
    res.status(200).json({ message: "Password was reset successfully." });
  } catch (error) {
    next(error);
  }
};

export const refresh_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await UserService.refresh(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      httpOnly: true,
      maxAge: maxAge,
    });
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};
export const send_contact_email = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, subject, message, token } = req.body;

  try {
    const userData = token ? TokenService.validateAccessToken(token) : null;
    const recipientEmail = email || userData?.email;

    if (recipientEmail) {
      await MailService.sendContactMail(name, recipientEmail, subject, message);
      return res.json({ success: true, message: "Email sent successfully" });
    }

    return res
      .status(400)
      .json({ success: false, message: "Error. Email was not sent" });
  } catch (e) {
    next(e);
  }
};
export const googleOauthHandler = async (req: Request, res: Response) => {
  const code: string = req.query.code as string;
  const customParameter = req.query.state;
  try {
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });
    const googleUser = await getGoogleUser({ id_token, access_token });

    if (!googleUser.verified_email) {
      return res.status(403).send("Google account is not verified");
    }
    const userData = await UserService.loginGoogleUser(
      code,
      customParameter,
      googleUser.name,
      googleUser.family_name,
      googleUser.email,
      googleUser.picture,
      process.env.USERS_AFTER_GOOGLE_PASSWORD
    );

    res.cookie("refreshToken", userData.refreshToken, {
      httpOnly: true,
      maxAge: maxAge,
    });
    res.cookie("accessToken", userData.accessToken, {
      httpOnly: true,
      maxAge: maxAge,
    });

    const redirectURL: string = `${process.env.CLIENT_URL}/
    ?id=${userData.user.id}
    &type=${userData.user.type}
    &name=${userData.user.name}
    &surname=${userData.user.surname}
    &email=${userData.user.email}
    &picture=${userData.picture}`;
    res.redirect(redirectURL);
  } catch (error) {
    return res.redirect(`${process.env.CLIENT_URL}/oauth/error`);
  }
};

export const delete_all = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [userData]: Awaited<void>[] = await Promise.all([
      UserService.deleteData(),
    ]);
    return res.json(userData);
  } catch (e) {
    next(e);
  }
};
