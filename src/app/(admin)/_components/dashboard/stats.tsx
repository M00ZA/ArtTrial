"use client"

import Link from "next/link"

import { Captions, List, ListChecks, Lock, LucideIcon, Palette, ShoppingBasket, Users, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { formatNumber } from "@/lib/utils"
import { getUsers } from "../../_actions/users"
import { getProducts } from "../../_actions/products"
import { getAdmins } from "../../_actions/admins"
import { getArtists } from "../../_actions/artists"
import { getEvents } from "../../_actions/events"
import { getCategories } from "../../_actions/categories"

import { useQueries } from "@tanstack/react-query"
import { useAdmin } from "@/hooks/useAdmin"
import { getStyles } from "../../_actions/styles"
import { getSubjects } from "../../_actions/subjects"

export const StatsComponent = () => {

  const { admin, isLoading: adminStillLoading } = useAdmin()

  const queriesForIT = useQueries({
    queries: [
      { queryKey: ['users'], queryFn: () => getUsers({
      page: 1,
      size: 3,
      sortBy:"userName asc"
    }), enabled: admin?.role === 'it' },
      { queryKey: ['artists'], queryFn: () => getArtists(), enabled: admin?.role === 'it' },
      { queryKey: ['events'], queryFn: () => getEvents(), enabled: admin?.role === 'it' },
      { queryKey: ['products'], queryFn: () => getProducts(), enabled: admin?.role === 'it' },
    ],
  })

  const queriesForCEO = useQueries({
    queries: [
      { queryKey: ['categories'], queryFn: () => getCategories(), enabled: admin?.role === 'ceo' },
      { queryKey: ['admins'], queryFn: () => getAdmins(), enabled: admin?.role === 'ceo' },
      { queryKey: ['styles'], queryFn: () => getStyles(), enabled: admin?.role === 'ceo' },
      { queryKey: ['subjects'], queryFn: () => getSubjects(), enabled: admin?.role === 'ceo' },
    ]
  })

  const queriesForTracker = useQueries({
    queries: [
      { queryKey: ['orders'], queryFn: () => getCategories(), enabled: admin?.role === 'tracker' },
    ]
  })

  const dataForIT = {
    users: { count: queriesForIT[0].data?.data?.data?.users?.length },
    artists: { count: queriesForIT[1].data?.data?.data?.artists?.length },
    events: { count: queriesForIT[2].data?.data?.data?.events?.length },
    products: { count: queriesForIT[3].data?.data?.data?.products?.length },
  }

  const dataForCEO = {
    categories: { count: queriesForCEO[0].data?.data?.data?.categories?.length },
    admins: { count: queriesForCEO[1].data?.data?.data?.admins?.length },
    styles: { count: queriesForCEO[2].data?.data?.data?.styles?.length },
    subjects: { count: queriesForCEO[3].data?.data?.data?.subjects?.length },
  }

  const dataForTracker = {
    orders: { count: queriesForTracker[0].data?.data?.data?.orders?.length },
  }

  if (adminStillLoading) return <StatsComponent.Loading />

  if (admin?.role === 'it' && queriesForIT[0].isLoading && queriesForIT[1].isLoading && queriesForIT[2].isLoading && queriesForIT[3].isLoading) return <StatsComponent.Loading />
  if (admin?.role === 'ceo' && queriesForCEO[0].isLoading && queriesForCEO[1].isLoading && queriesForCEO[2].isLoading && queriesForCEO[3].isLoading) return <StatsComponent.Loading />
  if (admin?.role === 'tracker' && queriesForTracker[0].isLoading) return <StatsComponent.Loading />

  if (admin.role === 'it') {
    return (
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatsComponent.Item label='Users' stats={dataForIT?.users?.count} url="/admin/users" urlLabel="All users" icon={Users} />
        <StatsComponent.Item label='Artists' stats={dataForIT?.artists?.count} url="/admin/artists" urlLabel="Artists" icon={Palette} />
        <StatsComponent.Item label='Products' stats={dataForIT?.products?.count} url="/admin/products" urlLabel="Products" icon={ShoppingBasket} />
        <StatsComponent.Item label='Events' stats={dataForIT?.events?.count} url="/admin/events" urlLabel="Events" icon={List} />
      </div>
    )
  }

  if (admin.role === 'ceo') {
    return (
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatsComponent.Item label='Admins' stats={dataForCEO.admins.count} url="/admin/admins" urlLabel="Admins" icon={Lock} />
        <StatsComponent.Item label='Categories' stats={dataForCEO.categories.count} url="/admin/categories" urlLabel="All categories" icon={ListChecks} />
        <StatsComponent.Item label='Styles' stats={dataForCEO.styles.count} url="/admin/styles" urlLabel="Styles" icon={Wand2} />
        <StatsComponent.Item label='Subjects' stats={dataForCEO.subjects.count} url="/admin/subjects" urlLabel="Subjects" icon={Captions} />
      </div>
    )
  }

  if (admin.role === 'tracker') {
    return (
      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatsComponent.Item label='Orders' stats={dataForCEO.categories.count} url="/admin/orders" urlLabel="All orders" icon={ShoppingBasket} />
      </div>
    )
  }

  return (
    <div>Couldn't Load Admin Role!</div>
  )
}

StatsComponent.Loading = () => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {Array.from({ length: 4 }).map(() => (
        <Skeleton className='h-[180px] shadow-md rounded-md p-6 py-4 ring-1 ring-gray-200' />
      ))}
    </div>
  )
}

interface ItemProps {
  label: string,
  icon: LucideIcon,
  stats: number,
  url: string,
  urlLabel: string
}

StatsComponent.Item = ({ label, icon: Icon, stats, url, urlLabel }: ItemProps) => {
  return (
    <div className='shadow-md rounded-md p-6 py-4 ring-1 ring-gray-200'>
      <h3 className="font-bold mb-5 text-primary">{label}</h3>
      <p className='m-2 mb-6 text-3xl font-bold'>{stats ? formatNumber(stats) : <span className='text-gray-400'>Loading...</span>}</p>
      <div className='flex justify-between items-center'>
        <Button variant='outline' size='sm'><Link href={url}>{urlLabel}</Link></Button>
        <Icon className='text-primary' />
      </div>
    </div>
  )
}
