import express, { NextFunction, Request, Response } from "express";
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Inject,
  Patch,
  Path,
  Put,
  Query,
  Route,
  Security,
  SuccessResponse,
  Tags
} from "tsoa";
import taskService from "../services/task.service";
import { CreateTask, Task, UpdateTask } from "../types/Dtos/task.dto";
import { SUCCESS_CREATED } from "../constants/general";
import { HTTP_CREATED } from "../constants/httpStatusCodes";


@Tags("Tasks")
@Route("api/tasks")
@Security("jwtAuth")
export default class TaskController extends Controller {
  @SuccessResponse(HTTP_CREATED, SUCCESS_CREATED)
  @Post()
  public static async createTask(@Body() newTask: CreateTask): Promise<Task> {
    console.log(newTask);
    return taskService.create(newTask);
  }

  @Get("{id}")
  public static async getById(@Path() id: string): Promise<Task | undefined> {
    return taskService.getById(id);
  }

  @Get()
  public static async getAllTasks(): Promise<Task[]> {
    return taskService.getAll();
  }

  @Put("{id}")
  public static async updateTask(
    @Path() id: string,
    @Body() updatedTask: UpdateTask
  ): Promise<Task> {
    return taskService.update(id, updatedTask);
  }

  @SuccessResponse("204", "No Content")
  @Delete("{id}")
  public static async deleteTask(@Path() id: string): Promise<void> {
    return taskService.delete(id);
  }
}
