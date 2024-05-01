import { Request, Response } from "express";
import todoModel from "../model/todoModel";
import { iProps } from "../model/todoModel";

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const createTask = await todoModel.create({ title: title });

    return res.status(201).json({
      message: "Todo task created successfully",
      data: createTask,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error creating new Todo",
      data: error.message,
    });
  }
};

export const moveTodoToProgress = async (req: Request, res: Response) => {
  try {
    const { ID } = req.params;

    const createTask = await todoModel.findByIdAndUpdate(
      ID,
      { progress: true },
      { new: true }
    );

    return res.status(201).json({
      message: "Todo task created successfully",
      data: createTask,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating new Todo",
    });
  }
};

export const moveProgressToDone = async (req: Request, res: Response) => {
  try {
    const { ID } = req.params;

    const findTask = await todoModel.findById(ID);

    if (findTask?.progress) {
      const createTask = await todoModel.findByIdAndUpdate(
        ID,
        { done: true },
        { new: true }
      );
      return res.status(201).json({
        message: "Todo task created successfully",
        data: createTask,
      });
    } else {
      return res.status(404).json({
        message: "Task must have started first..!",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error creating new Todo",
    });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const getTask = await todoModel.find();

    return res.status(201).json({
      message: "Todo task created successfully",
      data: getTask,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating new Todo",
    });
  }
};

export const getAllCombine = async (req: Request, res: Response) => {
  try {
    const getTask = await todoModel.find();

    const getAllTask = getTask.filter((el: iProps) => {
      return el.progress === false && el.done === false;
    });

    const getAllProgress = getTask.filter((el: iProps) => {
      return el.progress === true && el.done === false;
    });

    const getAllDone = getTask.filter((el: iProps) => {
      return el.progress === true && el.done === true;
    });

    let data = {
      task: getAllTask,
      progress: getAllProgress,
      done: getAllDone,
    };

    return res.status(200).json({
      message: "Todo task gotten successfully",
      data: data,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error creating new Todo",
    });
  }
};
