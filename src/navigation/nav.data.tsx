import {
    Layout,
    NotFoundPage,
    ProductsPage,
    SingleProductPage
} from '@/screens'

type Route = {
    path: string
    element: JSX.Element
    children?: Route[]
}

export const routes: Route[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <ProductsPage /> },
            { path: '/:productId', element: <SingleProductPage /> }
        ]
    },
    { path: '*', element: <NotFoundPage /> }
]
