"use client"

import { Palette, Trash } from "lucide-react"
import { PageTitle } from "../page-title"
import { Button } from "@/components/ui/button"
import { ArtistsColumns } from "../../_tables/artists";
import { TableSkeleton } from "../table-skeleton";
import { DataTable } from "../data-grid";

import { useQuery } from "@tanstack/react-query";

import { getArtists } from "../../_actions/artists";

export const ArtistsComponent = () => {

  const artistsQuery = useQuery({
    queryKey: ['artists'],
    queryFn: () => getArtists()
  })

  if (artistsQuery.isLoading) {
    return (
      <TableSkeleton  />
    )
  }

  return (
    <div>
      <PageTitle label='Artists' icon={Palette} />
      <DataTable 
        rows={artistsQuery?.data?.data?.data && artistsQuery.data.data.data.artists}
        columns={ArtistsColumns}
      />
    </div>
  )
}