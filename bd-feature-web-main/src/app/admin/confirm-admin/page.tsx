import ConfirmAdminScreen from "@/screens/confirm-admin/confirm_admin_screen";
import { Suspense } from "react";

const ConfirmAdminPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmAdminScreen />
    </Suspense>
  );
};

export default ConfirmAdminPage;
