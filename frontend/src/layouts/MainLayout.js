import { Outlet } from "react-router-dom";
import MainNavigation from "./../components/MainNavigation";

export default function MainLayout() {
  return (
    <>
      <MainNavigation />
      <Outlet />
    </>
  );
}
