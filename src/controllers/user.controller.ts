import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Path,
  Put,
  Query,
  Route,
  Tags,
  Security,
  SuccessResponse,
} from "tsoa";
import { ChangePasswordRequest, UpdateUser, User } from "../types/Dtos/user.dto";
import { HTTP_ACCESS_DENIED, HTTP_OK } from "../constants/httpStatusCodes";
import userService from "../services/user.service";
import CustomError from "../helpers/CustomError";
import { HashString, comparePassword } from "../helpers";
import { ErrorCode } from "../constants";
import { INCORRECT_OLD_PASSWORD } from "../constants/general";

@Tags("Users")
@Route("api/users")
@Security("jwtAuth")
export default class UserController extends Controller {
  @Get("{id}")
  public static async getById(@Path() id: string): Promise<User | undefined> {
    return userService.getById(id);
  }

  @Get()
  public static async getAllUsers(): Promise<User[]> {
    return userService.getAll();
  }

  @Put("{id}")
  public static async updateUser(
    @Path() id: string,
    @Body() updatedUser: UpdateUser
  ): Promise<User> {
    return userService.update(id, updatedUser);
  }

  @SuccessResponse("204", "No Content")
  @Delete("{id}")
  public static async deleteUser(@Path() id: string): Promise<void> {
    return userService.delete(id);
  }

  @SuccessResponse(HTTP_OK, "Ok")
  @Patch("change-password")
  public static async changePassword(
    @Body() payload: ChangePasswordRequest,
    @Inject() user: User
  ) {
    const currentUser = await userService.getById(user.id);
    if (!currentUser) {
      throw new CustomError(ErrorCode.INVALID_USER);
    }
    const isSame = await comparePassword(
      payload.oldPassword,
      currentUser.password
    );

    if (!isSame) {
      throw new CustomError(INCORRECT_OLD_PASSWORD, HTTP_ACCESS_DENIED);
    }
    const hashedNewPassword = await HashString(payload.password);
    return await userService.changePassword(hashedNewPassword, user.id);
  }
}
