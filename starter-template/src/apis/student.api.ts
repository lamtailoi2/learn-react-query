import axios from "libs/axios";
import type { Student, Students } from "../types/student.type";
export const getStudents = (page: number | string, limit: number | string) =>
  axios.get<Students>("students", { params: { _page: page, _limit: limit } });

export const addStudent = (newStudent: Omit<Student, "id">) =>
  axios.post<Omit<Student, "id">>("students", newStudent);

export const getStudent = (id: number | string) =>
  axios.get<Student>(`students/${id}`);

export const updateStudent = (id: number | string, student: Partial<Student>) =>
  axios.patch<Partial<Student>>(`students/${id}`, student);

export const deleteStudent = (id: number | string) =>
  axios.delete<{}>(`students/${id}`);
