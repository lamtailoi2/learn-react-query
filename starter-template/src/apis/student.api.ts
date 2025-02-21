import axios from "libs/axios";
import type { Student, Students } from "../types/student.type";
export const getStudents = (page: number | string, limit: number | string) =>
  axios.get<Students>("students", { params: { _page: page, _limit: limit } });

export const addStudent = (newStudent: Omit<Student, "id">) =>
  axios.post("students/add", newStudent);
