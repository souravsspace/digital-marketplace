"use client"

import { QueryClient, QueryClientProvider } from "react-query"

type Props = {
   children: React.ReactNode
}

const query = new QueryClient()

export default function QueryProvider({ children }: Props) {
   return <QueryClientProvider client={query}>{children}</QueryClientProvider>
}
