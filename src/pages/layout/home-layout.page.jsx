import { Outlet } from "react-router-dom"
import HomeFooter from "../../components/footers/footer.component"
import { HomeHeader } from "../../components/headers/header.component"

const HomePageLayout = () => {
    return (<>
        <HomeHeader />
        {/* Content Here starts */}

        <Outlet />

        {/* Content Here ends */}
        <HomeFooter/>
    </>)
}

export default HomePageLayout