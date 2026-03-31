import type { Friend } from "../models/freind.model.js";

export interface PageOption {
  offset: number;
  limit: number;
}
export interface PageResult<T> {
  data: T[];
  match: number;
  total: number;
}
