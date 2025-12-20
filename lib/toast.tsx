import {
  BadgeCheck,
  BadgeMinus,
  Loader,
  Loader2,
  User,
  UserRoundX,
} from "lucide-react"; // make sure Ban is imported
import { toast } from "sonner";

export const showLoadingToast = (title: string, description: string) =>
  toast(title, {
    description: (
      <span className="bg-white text-black dark:bg-neutral-900 dark:text-white">
        {description}
      </span>
    ),
    icon: <Loader className="animate-spin text-blue-500" />,
    duration: Infinity,
  });

export const showSuccessToast = (
  title: string,
  description: string,
  icon = <User className="text-purple-500" />
) =>
  toast(title, {
    description: (
      <span className="bg-white text-black dark:bg-neutral-900 dark:text-white">
        {description}
      </span>
    ),
    icon,
  });

export const showErrorToast = (
  title: string,
  description: string,
  icon = <UserRoundX className="text-red-500" />
) =>
  toast(title, {
    description: (
      <span className="bg-white text-black dark:bg-neutral-900 dark:text-white">
        {description}
      </span>
    ),
    icon,
  });

export const handleMockSuccess = async (title: string, description: string) => {
  toast(title, {
    description: (
      <span className="bg-white text-black  dark:bg-neutral-900 dark:text-white">
        &quot;Please wait a moment.&ldquo;,
      </span>
    ),
    icon: <Loader2 className="animate-spin spin-in " />,
    className: "bg-black text-black font-bold dark:bg-neutral-900 ",
  });

  await new Promise((r) => setTimeout(r, 1500));

  toast("Saved successfully!", {
    description: (
      <span className="bg-white text-black  dark:bg-neutral-900 dark:text-white">
        {description}
      </span>
    ),
    icon: <BadgeCheck className="text-green-500" />,
  });
};

export const handleMockDelete = async (description: string) => {
  toast("Deleting...", {
    description: (
      <span className="bg-white text-black  dark:bg-neutral-900 dark:text-white">
        &quot;Please wait a moment.&ldquo;,
      </span>
    ),
    icon: <Loader2 className="animate-spin spin-in " />,
    className: "bg-black text-black font-bold dark:bg-neutral-900 ",
  });

  await new Promise((r) => setTimeout(r, 1500));

  toast("Deleted successfully!", {
    description: (
      <span className="bg-white text-black  dark:bg-neutral-900 dark:text-white">
        {description}
      </span>
    ),
    icon: <BadgeMinus className="text-red-500" />,
  });
};
