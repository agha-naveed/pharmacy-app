import { Outlet } from "react-router-dom";
import Header from "../../extra-components/Header";

export default function Customer() {
    return (
        <div className="w-full overflow-hidden">
            <Header value="Customers Details" />
            <Outlet />
        </div>
    )
}