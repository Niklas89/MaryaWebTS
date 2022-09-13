import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App">
            <Outlet /> {/* Outlet component represents all the children of the Layout component   */}
        </main>
    )
}

export default Layout
