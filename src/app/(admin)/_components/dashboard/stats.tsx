"use client";

import Link from "next/link";

import {
  Captions,
  List,
  ListChecks,
  Lock,
  LucideIcon,
  Palette,
  ShoppingBasket,
  Users,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { formatNumber } from "@/lib/utils";
import { getUsers } from "../../_actions/users";
import { getProducts } from "../../_actions/products";
import { getAdmins } from "../../_actions/admins";
import { getArtists } from "../../_actions/artists";
import { getEvents } from "../../_actions/events";
import { getCategories } from "../../_actions/categories";

import { useQueries } from "@tanstack/react-query";
import { useAdmin } from "@/hooks/useAdmin";
import { getStyles } from "../../_actions/styles";
import { getSubjects } from "../../_actions/subjects";
import {
  getAllProductsReport,
  getArtistStatisticReport,
  getLastAuctionsReport,
  getLastEventsReport,
  getSingleArtistStatisticReport,
  getUnavailableProductsReport,
} from "../../_actions/reports";
import { useState } from "react";
import ReportsElement from "./reportsElement";
import { getOrders } from "../../_actions/orders";

export const StatsComponent = () => {
  const { admin, isLoading: adminStillLoading } = useAdmin();
  console.log(admin);

  const [enabledReports, setEnabledReports] = useState({
    availableProducts: false,
    unavailableProducts: false,
    artistsStatistic: false,
    singleArtistStatistic: false,
    availableEvents: false,
    availableAuctions: false,
  });

  const queriesForIT = useQueries({
    queries: [
      {
        queryKey: ["users"],
        queryFn: () => getUsers({}),
        enabled: admin?.role?.toLowerCase() === "it",
      },
      {
        queryKey: ["artists"],
        queryFn: () => getArtists(),
        enabled: admin?.role?.toLowerCase() === "it",
      },
      {
        queryKey: ["events"],
        queryFn: () => getEvents({}),
        enabled: admin?.role?.toLowerCase() === "it",
      },
      {
        queryKey: ["products"],
        queryFn: () => getProducts(),
        enabled: admin?.role?.toLowerCase() === "it",
      },
    ],
  });

  const queriesForCEO = useQueries({
    queries: [
      {
        queryKey: ["categories"],
        queryFn: () => getCategories(),
        enabled: admin?.role?.toLowerCase() === "ceo",
      },
      {
        queryKey: ["admins"],
        queryFn: () => getAdmins(),
        enabled: admin?.role?.toLowerCase() === "ceo",
      },
      {
        queryKey: ["styles"],
        queryFn: () => getStyles(),
        enabled: admin?.role?.toLowerCase() === "ceo",
      },
      {
        queryKey: ["subjects"],
        queryFn: () => getSubjects(),
        enabled: admin?.role?.toLowerCase() === "ceo",
      },
      {
        queryKey: ["reports", "available", "products"],
        queryFn: () => getAllProductsReport({ sendResultToEmail: true }),
        enabled:
          admin?.role?.toLowerCase() === "ceo" &&
          enabledReports.availableProducts,
      },
      {
        queryKey: ["reports", "unavailable", "products"],
        queryFn: () =>
          getUnavailableProductsReport({ sendResultToEmail: true }),
        enabled:
          admin?.role?.toLowerCase() === "ceo" &&
          enabledReports.unavailableProducts,
      },
      {
        queryKey: ["reports", "artists", "statistics"],
        queryFn: () => getArtistStatisticReport({ sendResultToEmail: true }),
        enabled:
          admin?.role?.toLowerCase() === "ceo" &&
          enabledReports.artistsStatistic,
      },
      {
        queryKey: ["reports", "artist", "statistics"],
        queryFn: () =>
          getSingleArtistStatisticReport(admin?.id, {
            sendResultToEmail: true,
          }),
        enabled:
          admin?.role?.toLowerCase() === "ceo" &&
          enabledReports.singleArtistStatistic,
      },
      {
        queryKey: ["reports", "events"],
        queryFn: () => getLastEventsReport({ sendResultToEmail: true }),
        enabled:
          admin?.role?.toLowerCase() === "ceo" &&
          enabledReports.availableEvents,
      },
      {
        queryKey: ["reports", "auction"],
        queryFn: () => getLastAuctionsReport({ sendResultToEmail: true }),
        enabled:
          admin?.role?.toLowerCase() === "ceo" &&
          enabledReports.availableAuctions,
      },
    ],
  });

  const queriesForTracker = useQueries({
    queries: [
      {
        queryKey: ["orders"],
        queryFn: () => getOrders(),
        enabled: admin?.role?.toLowerCase() === "tracker",
      },
    ],
  });

  const dataForIT = {
    users: { count: queriesForIT[0].data?.data?.data?.users?.length || 0 },
    artists: { count: queriesForIT[1].data?.data?.data?.artists?.length },
    events: { count: queriesForIT[2].data?.data?.data?.events?.length },
    products: { count: queriesForIT[3].data?.data?.data?.products?.length },
  };
  console.log(dataForIT);
  const dataForCEO = {
    categories: {
      count: queriesForCEO[0].data?.data?.data?.length || 0,
    },
    admins: { count: queriesForCEO[1].data?.data?.data?.admins?.length || 0 },
    styles: { count: queriesForCEO[2].data?.data?.data?.length || 0 },
    subjects: { count: queriesForCEO[3].data?.data?.data?.length || 0 },
    availableProducts: {
      count: queriesForCEO[4].data?.data?.data?.pagination?.totalResults,
      code: queriesForCEO[4].data?.data?.code,
      loading: queriesForCEO[4].isLoading,
    },
    unavailableProducts: {
      count: queriesForCEO[5].data?.data?.data?.pagination?.totalResults,
      code: queriesForCEO[5].data?.data?.code,
      loading: queriesForCEO[5].isLoading,
    },
    artistsStatistic: {
      count: queriesForCEO[6].data?.data?.data?.pagination?.totalResults,
      code: queriesForCEO[6].data?.data?.code,
      loading: queriesForCEO[6].isLoading,
    },
    singleArtistStatistic: {
      count: queriesForCEO[7].data?.data?.data?.availableProducts?.length,
      code: queriesForCEO[7].data?.data?.code,
      loading: queriesForCEO[7].isLoading,
    },
    availableEvents: {
      count: queriesForCEO[8].data?.data?.data?.pagination?.totalResults,
      code: queriesForCEO[8].data?.data?.code,
      loading: queriesForCEO[8].isLoading,
    },
    availableAuctions: {
      count: queriesForCEO[9].data?.data?.data?.pagination?.totalResults,
      code: queriesForCEO[9].data?.data?.code,
      loading: queriesForCEO[9].isLoading,
    },
  };

  const dataForTracker = {
    orders: { count: queriesForTracker[0].data?.data?.data?.length },
  };

  if (adminStillLoading) return <StatsComponent.Loading />;

  if (
    admin?.role?.toLowerCase() === "it" &&
    queriesForIT[0].isLoading &&
    queriesForIT[1].isLoading &&
    queriesForIT[2].isLoading &&
    queriesForIT[3].isLoading
  )
    return <StatsComponent.Loading />;
  if (
    admin?.role?.toLowerCase() === "ceo" &&
    queriesForCEO[0].isLoading &&
    queriesForCEO[1].isLoading &&
    queriesForCEO[2].isLoading &&
    queriesForCEO[3].isLoading
  )
    return <StatsComponent.Loading />;
  if (
    admin?.role?.toLowerCase() === "tracker" &&
    queriesForTracker[0].isLoading
  )
    return <StatsComponent.Loading />;

  if (admin?.role?.toLowerCase() === "it") {
    return (
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatsComponent.Item
          label="Users"
          stats={dataForIT?.users?.count}
          url="/admin/users"
          urlLabel="All users"
          icon={Users}
        />
        <StatsComponent.Item
          label="Artists"
          stats={dataForIT?.artists?.count}
          url="/admin/artists"
          urlLabel="Artists"
          icon={Palette}
        />
        <StatsComponent.Item
          label="Products"
          stats={dataForIT?.products?.count}
          url="/admin/products"
          urlLabel="Products"
          icon={ShoppingBasket}
        />
        <StatsComponent.Item
          label="Events"
          stats={dataForIT?.events?.count}
          url="/admin/events"
          urlLabel="Events"
          icon={List}
        />
      </div>
    );
  }

  if (admin?.role?.toLowerCase() === "ceo") {
    return (
      <>
        <div className="grid grid-cols-4 gap-6 mb-6">
          <StatsComponent.Item
            label="Admins"
            stats={dataForCEO.admins.count}
            url="/admin/admins"
            urlLabel="Admins"
            icon={Lock}
          />
          <StatsComponent.Item
            label="Categories"
            stats={dataForCEO?.categories?.count}
            url="/admin/categories"
            urlLabel="All categories"
            icon={ListChecks}
          />
          <StatsComponent.Item
            label="Styles"
            stats={dataForCEO.styles.count}
            url="/admin/styles"
            urlLabel="Styles"
            icon={Wand2}
          />
          <StatsComponent.Item
            label="Subjects"
            stats={dataForCEO.subjects.count}
            url="/admin/subjects"
            urlLabel="Subjects"
            icon={Captions}
          />
        </div>
        <div className="bg-gray-200 h-screen w-full dark:bg-gray-700 flex justify-center items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 mt-4">
              <ReportsElement
                property="availableProducts"
                label="Available products"
                code={dataForCEO?.availableProducts?.code}
                enabledReports={enabledReports}
                setEnabledReports={setEnabledReports}
                isLoading={dataForCEO?.availableProducts?.loading}
              />
              <ReportsElement
                property="unavailableProducts"
                label="Unavailable Products"
                code={dataForCEO?.unavailableProducts?.code}
                enabledReports={enabledReports}
                setEnabledReports={setEnabledReports}
                isLoading={dataForCEO?.unavailableProducts?.loading}
              />
              <ReportsElement
                property="artistsStatistic"
                label="Artists Statistic"
                code={dataForCEO?.artistsStatistic?.code}
                isLoading={dataForCEO?.artistsStatistic?.loading}
                enabledReports={enabledReports}
                setEnabledReports={setEnabledReports}
              />
              {/* <ReportsElement
                property="singleArtistStatistic"
                label="Single Artist Statistic"
                code={dataForCEO?.singleArtistStatistic?.code}
                isLoading={dataForCEO?.singleArtistStatistic?.loading}
                enabledReports={enabledReports}
                setEnabledReports={setEnabledReports}
              /> */}
              <ReportsElement
                property="availableEvents"
                label="Available Events"
                code={dataForCEO?.availableEvents?.code}
                isLoading={dataForCEO?.availableEvents?.loading}
                enabledReports={enabledReports}
                setEnabledReports={setEnabledReports}
              />
              <ReportsElement
                property="availableAuctions"
                label="Available Auctions"
                code={dataForCEO?.availableAuctions?.code}
                isLoading={dataForCEO?.availableAuctions?.loading}
                enabledReports={enabledReports}
                setEnabledReports={setEnabledReports}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (admin?.role?.toLowerCase() === "tracker") {
    return (
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatsComponent.Item
          label="Orders"
          stats={dataForTracker.orders.count}
          url="/admin/orders"
          urlLabel="All orders"
          icon={ShoppingBasket}
        />
      </div>
    );
  }

  return <div>Couldn't Load Admin Role!</div>;
};

StatsComponent.Loading = () => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {Array.from({ length: 4 }).map(() => (
        <Skeleton className="h-[180px] shadow-md rounded-md p-6 py-4 ring-1 ring-gray-200" />
      ))}
    </div>
  );
};

interface ItemProps {
  label: string;
  icon: LucideIcon;
  stats: number;
  url: string;
  urlLabel: string;
}

StatsComponent.Item = ({
  label,
  icon: Icon,
  stats,
  url,
  urlLabel,
}: ItemProps) => {
  return (
    <div className="shadow-md rounded-md p-6 py-4 ring-1 ring-gray-200">
      <h3 className="font-bold mb-5 text-primary">{label}</h3>
      <p className="m-2 mb-6 text-3xl font-bold">
        {stats >= 0 ? (
          formatNumber(stats)
        ) : (
          <span className="text-gray-400">Loading...</span>
        )}
      </p>
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm">
          <Link href={url}>{urlLabel}</Link>
        </Button>
        <Icon className="text-primary" />
      </div>
    </div>
  );
};
