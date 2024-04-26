"use client"

import { Check, Trash } from "lucide-react"
import { PageTitle } from "../page-title"
import { Button } from "@/components/ui/button"

import { DataGrid } from '@mui/x-data-grid';

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Event } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getEvents } from "../../_actions/events";
import { EventsColumns } from "../../_tables/events";
import { TableSkeleton } from "../table-skeleton";
import { DataTable } from "../data-grid";

export const EventsComponent = () => {

  const pathname = usePathname()
  const queryClient = useQueryClient()

  const eventsQuery = useQuery({
    queryKey: ['events'],
    queryFn: () => getEvents()
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['events'] })
  }, [pathname])
  
  const events: Event[] = eventsQuery.data?.data?.data?.events

  if (eventsQuery.isLoading) {
    return (
      <TableSkeleton />
    )
  }

  return (
    <div>
      <PageTitle label='Events' icon={Check} />

      <DataTable
        rows={events}
        columns={EventsColumns}
      />
    </div>
  )
}