import apiFetch from "@/lib/apiFetch";
import { IClassRoutine } from "@/type/addminAccess/classRoutine.type";

export const createClassRoutine = (payload: IClassRoutine) => {
  return apiFetch('/api/class-routine', { method: 'POST', body: payload });
};
