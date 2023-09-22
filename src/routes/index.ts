import { RegisterPage } from "@/pages/register/RegisterPage";
import { LoginPage } from "@/pages/login/LoginPage";
import { MyPage } from "@/pages/my/MyPage";
import { ROUTE_KEYS } from "./routes";

export const ROUTE_COMPONENTS = {
  [ROUTE_KEYS.REGISTER]: RegisterPage,
  [ROUTE_KEYS.LOGIN]: LoginPage,
  [ROUTE_KEYS.HOME]: MyPage,
  [ROUTE_KEYS.MY]: MyPage,
};
