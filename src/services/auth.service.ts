import { ErrorCode } from "../constants";
import { SUCCESS_LOGIN, USER_EXIST } from "../constants/general";
import { comparePassword, generateToken } from "../helpers";
import CustomError from "../helpers/CustomError";
import { CreateUser, LoginUser } from "../types/Dtos/user.dto";
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
}

export default new AuthService();
