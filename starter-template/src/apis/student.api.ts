import axios from "libs/axios";
import type { Students } from "../types/student.type";
export const getStudents = (page: number | string, limit: number | string) =>
  axios.get<Students>("students", { params: { _page: page, _limit: limit } });
