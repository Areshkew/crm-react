import '../App.css';
import { createRootRoute } from '@tanstack/react-router'
import App from '../App';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
})