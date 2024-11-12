import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <h1>Hola, bienvenido a la página de inicio :)!</h1>
      <p>Por favor usa el menu para navegar.</p>
    </>
  )
}