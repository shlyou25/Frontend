"use client";
import { Mail, Phone, User, Lock } from "lucide-react";
import { backendUserData } from "./profile";

const ProfileInfo = ({
  name,
  email,
  phoneNumber,
  secondaryEmail,
}: backendUserData) => {
  return (
    <div className="space-y-5">
      <InfoRow icon={<User size={18} />} label="Name" value={name || "—"} />

      <InfoRow
        icon={<Phone size={18} />}
        label="Phone Number"
        value={phoneNumber || "Not provided"}
      />

      <InfoRow
        icon={<Mail size={18} />}
        label="Primary Email"
        value={email || "—"}
        badge="Primary · Used for login & sales"
      />

      <InfoRow
        icon={<Mail size={18} />}
        label="Secondary Email"
        value={secondaryEmail || "Not provided"}
        hint="Optional · Must be different from primary email"
      />
    </div>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  badge,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: string;
  hint?: string;
}) => (
  <div className="flex gap-4">
    <div className="text-gray-400 mt-1">{icon}</div>
    <div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        {badge && (
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Lock size={12} /> {badge}
          </span>
        )}
      </div>
      <p className="text-gray-900">{value}</p>
      {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
    </div>
  </div>
);

export default ProfileInfo;
