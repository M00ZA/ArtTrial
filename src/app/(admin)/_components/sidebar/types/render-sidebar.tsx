import { CEOSidebar } from "./ceo-sidebar";
import { ItSidebar } from "./it-sidebar";
import { TrackerSidebar } from "./tracker-sidebar";

export const RenderSidebar = ({
  role,
  language,
}: {
  role: string;
  language: string;
}) => {
  if (role?.toLowerCase() === "it") {
    return <ItSidebar language={language} />;
  } else if (role?.toLowerCase() === "ceo") {
    return <CEOSidebar language={language} />;
  } else if (role?.toLowerCase() === "tracker") {
    return <TrackerSidebar language={language} />;
  }
  return "Unknown role";
};
