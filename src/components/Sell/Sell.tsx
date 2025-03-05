import { Outlet } from "react-router-dom";
import Header from "../../extra-components/Header";

export default function Sell() {
    return (
        <div className="w-full overflow-hidden">
            <Header value="Sell History" />
            <Outlet />
        </div>
    )
}