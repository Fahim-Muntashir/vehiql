import React from "react";
import { TestDriveList } from "./_components/test-drive-list";

export const metadata = {
  title: "Test Drives | Vehiql Admin",
  description: "Manage Test Drive Bookings",
};

const TestDrivePage = () => {
  return (
    <div className="p-6">
      <h1>Test Drive Mangement</h1>
      <TestDriveList />
    </div>
  );
};

export default TestDrivePage;
