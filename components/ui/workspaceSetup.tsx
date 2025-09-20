import { useState, useRef, useEffect } from "react";
import { useSignupStore } from "@/store/signup";

interface WorkspaceSetupProps {
  userName?: string;
  onSubmit?: (workspaceName: string, role: string) => void;
}

const WorkspaceSetup: React.FC<WorkspaceSetupProps> = ({
  userName = "Samuel",
  onSubmit = () => {},
}) => {
  const { workspaceName, setWorkspaceName } = useSignupStore()

  const [selectedRole, setSelectedRole] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const roles = [
    "Teacher",
    "Student",
    "Manager",
    "Developer",
    "Designer",
    "Marketing",
    "Sales",
    "Other",
  ];

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    if (workspaceName && selectedRole) {
      onSubmit(workspaceName, selectedRole);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center lg:justify-start lg:pl-12 overflow-hidden">
      <div className="w-full max-w-md relative z-10 max-sm:p-4">
        {/* Greeting */}
        <div className="mb-8 text-center lg:text-left">
          <h1 className="text-2xl md:text-2xl font-bold text-gray-900 mb-2">
            Hi {userName}, nice to meet you 
          </h1>
          <p className="text-gray-600 text-sm">
            We use this to personalize your experience — should only take 10
            seconds!
          </p>
        </div>

        {/* Workspace Name Input */}
        <div className="mb-6 text-sm">
          <label className="block text-gray-700 font-medium mb-2">
            Name your Workspace
          </label>
          <input
            type="text"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            placeholder="Enter workspace name"
            className="w-full px-3 py-2 text-base md:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 transition"
          />
        </div>

        {/* Role Selection Dropdown */}
        <div className="mb-8 text-base md:text-sm relative" ref={dropdownRef}>
          <label className="block text-gray-700 font-medium mb-2">
            What's your role
          </label>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <span
              className={selectedRole ? "text-gray-900" : "text-gray-500"}
            >
              {selectedRole || "Select role"}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-20">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelect(role)}
                  className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 transition first:rounded-t-lg last:rounded-b-lg"
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end lg:justify-end">
          <button
            onClick={handleSubmit}
            disabled={!workspaceName || !selectedRole}
            className="w-1/2 bg-[#0C101B] text-sm hover:bg-[#0C101B]/95 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition"
          >
            Take me to dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSetup;
