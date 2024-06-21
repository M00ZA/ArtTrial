import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type IProps = {
  label: string;
  property: keyof {
    availableProducts: boolean;
    unavailableProducts: boolean;
    artistsStatistic: boolean;
    singleArtistStatistic: boolean;
    availableEvents: boolean;
    availableAuctions: boolean;
  };
  setEnabledReports: Dispatch<
    SetStateAction<{
      availableProducts: boolean;
      unavailableProducts: boolean;
      artistsStatistic: boolean;
      singleArtistStatistic: boolean;
      availableEvents: boolean;
      availableAuctions: boolean;
    }>
  >;
  code?: number;
  enabledReports: {
    availableProducts: boolean;
    unavailableProducts: boolean;
    artistsStatistic: boolean;
    singleArtistStatistic: boolean;
    availableEvents: boolean;
    availableAuctions: boolean;
  };
  isLoading: boolean;
};

export default function ReportsElement({
  label,
  property,
  setEnabledReports,
  code,
  enabledReports,
  isLoading,
}: IProps) {
  return (
    <div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
            {/* Available products */}
            {label}
          </dt>
          <dd
            className={`${
              enabledReports[property] && !isLoading ? "visible" : "invisible"
            } mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400`}
          >
            {code == 200 ? "Sent successfully" : "failed to send"}
          </dd>
          <Button
            variant="default"
            size="sm"
            className="mt-2"
            onClick={(e) => {
              e.preventDefault();
              setEnabledReports((prevState) => ({
                ...prevState,
                [property]: !prevState[property],
              }));
            }}
          >
            <span>
              {isLoading ? <Loader className="animate-spin mr-2" /> : false}
            </span>
            <span>
              {enabledReports[property] && !isLoading
                ? "Hide Message"
                : "Send reports by mail"}
            </span>
          </Button>
        </dl>
      </div>
    </div>
  );
}
