import { User } from "./user.dto";

enum prioritiesEnum {
  Low = "Low",
  Normal = "Normal",
  High = "High",
}
export interface Task {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  assignees: User[];
  priority: prioritiesEnum;
  fileAttachment: string;
}

export type CreateTask = Omit<Task, "id"> & {
  assignees: string[];
};

export type UpdateTask = Omit<Task, "id"> & {
  assignees: string[];
};

