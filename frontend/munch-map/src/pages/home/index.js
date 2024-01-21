import "./index.css";
import logo from "../../assets/logo.svg";
import divider from "../../assets/divider.svg";

export default function Home() {
    return (
        <div className={"homepage"}>
            <div className={"header"}>
                <div className={"heading"}>MunchMate</div>
                <div className={"subheading"}>A Food Share app</div>
                <div className="logo"><img src={logo}/></div>
                <div className={"buttons"}><a className={"create"} href="/signup">Create Account</a></div>
                <div className="sign-in-divider"><img src={divider}/></div>
                <div className={"buttons"}><a className={"sign-in"} href="/login">Sign In</a></div>
            </div>
        </div>
    );
}
