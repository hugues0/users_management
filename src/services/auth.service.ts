import { ErrorCode } from "../constants";
import { SEND_FORGET_PASSWORD, SUCCESS_LOGIN, SUCCESS_PASSWORD_RESET, USER_EXIST } from "../constants/general";
import { HashString, comparePassword, generateToken, verifyToken } from "../helpers";
import CustomError from "../helpers/CustomError";
import { CreateUser, ForgotPasswordRequest, IJwtPayload, LoginUser, ResetPasswordRequest } from "../types/Dtos/user.dto";
import UserService from "./user.service";

class AuthService {
  private readonly userService: typeof UserService;

  constructor() {
    this.userService = UserService;
  }

  async create(newUser: CreateUser) {
    const user = await this.userService.getByEmail(newUser.email);
    if (user) {
      throw new CustomError(USER_EXIST);
    }
    const createdUser = await this.userService.create(newUser);
    return createdUser;
  }

  async login(loginUser: LoginUser) {
    const user = await this.userService.getByEmail(loginUser.email);
    if (!user) {
      throw new CustomError(ErrorCode.INVALID_USER);
    }

    const isSame = await comparePassword(loginUser.password, user.password);
    if (!isSame) {
      throw new CustomError(ErrorCode.INVALID_CREDENTIALS);
    }

    const userPayload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      position: user.position,
    };

    const verificationToken = await generateToken(userPayload);

    return {
      success: true,
      accessToken: verificationToken,
      user: userPayload,
    };
  }

  async forgotPassword(forgetPasswordRequest: ForgotPasswordRequest) {
    const { email } = forgetPasswordRequest;
    const findUser = await this.userService.getByEmail(email);
    if (!findUser) {
      return {
        message: "Email not found",
      };
    }
    const token =
      findUser &&
      (await generateToken({ ref: findUser.id, email: findUser.email }));

    return {
      message: SEND_FORGET_PASSWORD,
      token,
    };
  }

  async resetPassword(
    token: string,
    resetPasswordRequest: ResetPasswordRequest
  ) {
    const { password } = resetPasswordRequest;
    const updatedPassword = await HashString(password);
    const { ref } = (await verifyToken(token)) as IJwtPayload;
    await this.userService.update(ref, { password: updatedPassword });

    return {
      message: SUCCESS_PASSWORD_RESET,
    };
  }
}

export default new AuthService();
