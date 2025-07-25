import React from "react";
import { SettingsForm } from "./_components/settings-form";

export const metadata = {
  title: "Settings || Vehiql Admin",
  description: "Manage Dealership working and admin Users",
};

const SettingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <SettingsForm></SettingsForm>
    </div>
  );
};

export default SettingsPage;
