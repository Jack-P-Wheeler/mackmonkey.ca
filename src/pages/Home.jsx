import LoginForm from "../components/LoginForm";
import CreateAccountForm from "../components/CreateAccountForm";
import PostMessageForm from "../components/PostMessageForm";
import PostLoader from "../components/DocumentLoader";
import InfoPopup from "../components/InfoPopup";
import WarningPopup from "../components/WarningPopup";
import HazardPopup from "../components/HazardPopup";

const Home = () => {

    return (
        <div className="flex justify-center">
            <section className="w-[1350px] mx-2 grid lg:grid-cols-3 gap-2 mt-2 grid-rows-3">
                <section>
                    <PostMessageForm/>
                </section>
                <section>
                    <LoginForm/>
                </section>
                <section className="row-span-2">
                    <CreateAccountForm/>
                </section>
                <section className="row-span-2">
                    {/* <PostLoader/> */}
                </section>
                <section className="grid gap-2">
                    <InfoPopup>This is some info.</InfoPopup>
                    <WarningPopup>This is a warning...</WarningPopup>
                    <HazardPopup>This is a hazard!</HazardPopup>
                </section>
            </section>
        </div>
        
    )
}

export default Home