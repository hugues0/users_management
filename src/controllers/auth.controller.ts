import {
  Body,
  Controller,
  Post,
  Route,
  SuccessResponse,
  Path,
  Put,
} from "tsoa";
// import {
//   CreateUser,
//   User,
//   CreatedUser,
//   CreateCompanyWithUserInfo,
//   LoginUser,
//   SignInResponse,
//   IResetPasswordSuccess,
//   ResetPasswordRequest,
//   ForgotPasswordRequest,
//   CreateSocialUser,
// } from "../types/Dtos/User.dto";
import authService from "../services/auth.service";
import { CreateUser, ForgotPasswordRequest, IResetPasswordSuccess, LoginUser, ResetPasswordRequest, SignInResponse, User } from "../types/Dtos/user.dto";
import { SUCCESS_CREATED } from "../constants/general";
import { HTTP_CREATED, HTTP_OK } from "../constants/httpStatusCodes";
//import { ICompanyProfileData } from "../types/Dtos/onBoardingCompany.Dto";

@Route("api/auth")
export default class AuthController extends Controller {
  @SuccessResponse(HTTP_CREATED, SUCCESS_CREATED)
  @Post("signup")
  public static async createUser(@Body() newUser: CreateUser): Promise<User> {
    return authService.create(newUser);
  }

  @SuccessResponse("200", "OK")
  @Post("signin")
  public static async loginUser(
    @Body() loginUser: LoginUser
  ): Promise<SignInResponse> {
    return authService.login(loginUser as LoginUser);
  }

  @Post("forgot-password")
  @SuccessResponse(HTTP_OK, "Ok")
  public static async forgotPassword(
    @Body() req: ForgotPasswordRequest
  ): Promise<IResetPasswordSuccess> {
    return authService.forgotPassword(req);
  }

  @Post("reset-password/{token}")
  @SuccessResponse(HTTP_OK, "Ok")
  public static async resetPassword(
    @Path() token: string,
    @Body() req: ResetPasswordRequest
  ): Promise<IResetPasswordSuccess> {
    const inputs: ResetPasswordRequest = {
      password: req.password,
      confirm_password: req.confirm_password,
    };
    return await authService.resetPassword(token, inputs);
  }
}
