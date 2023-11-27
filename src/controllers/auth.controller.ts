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
import { CreateUser, LoginUser, SignInResponse, User } from "../types/Dtos/user.dto";
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
}
