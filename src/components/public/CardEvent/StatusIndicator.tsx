import { HiOutlineGlobeAlt, HiOutlineLocationMarker } from "react-icons/hi";

interface StatusIndicatorProps {
  isOnline: boolean;
}

function StatusIndicator({ isOnline }: StatusIndicatorProps) {
  return (
    <span className="flex items-center gap-1">
      {isOnline ? (
        <>
          <HiOutlineGlobeAlt size={20} className="text-purple-500" />
          <span className="text-gray-600 dark:text-gray-300">Online</span>
        </>
      ) : (
        <>
          <HiOutlineLocationMarker size={20} className="text-purple-500" />
          <span className="text-gray-600 dark:text-gray-300">Offline</span>
        </>
      )}
    </span>
  );
}

export default StatusIndicator;
