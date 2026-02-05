import Header from "../Components/Header"
import HomeNavbar from "../Components/HomeNavbar"


function Home() {
    return (
        <>
        <Header />
        <div className="min-h-[calc(100vh-48px)] mt-12 bg-surface-a10 p-6 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[60px_60px]">
            <HomeNavbar />
        </div>
        </>
    )
}

export default Home
