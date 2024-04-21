// import { createCookieSessionStorage } from 'remix';
import {
  useSession as useSessionVinxi,
  getSession as getSessionVinxi,
  updateSession,
  clearSession,
} from "vinxi/http";

export enum SessionCookieProperties {
  USER_ID = "userId",
}

export const useSession = () =>
  useSessionVinxi({ password: process.env.SESSION_SECRET });
export const getSession = () =>
  useSessionVinxi<{}>({ password: process.env.SESSION_SECRET! });
export const commitSession = updateSession;
export const destroySession = clearSession;

// export const { getSession, commitSession, destroySession } = createCookieSessionStorage({
//   // a Cookie from `createCookie` or the same CookieOptions to create one
//   cookie: {
//     name: '__session',
//     secrets: ['insecure_example'],
//     sameSite: 'strict',
//     maxAge: 604_800, // one week
//   },
// });
