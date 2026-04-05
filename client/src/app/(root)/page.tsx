import ConnectraFor from "@/components/ConnectraFor";
import ConnectraInAction from "@/components/ConnectraInAction";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import KeyFeatures from "@/components/KeyFeatures";
import Privacy from "@/components/Privacy";

const Home = () => {
    return (
        <main className="overflow-auto">
            <Hero />
            <KeyFeatures />
            <ConnectraInAction />
            <HowItWorks />
            <Privacy />
            <ConnectraFor />
        </main>
    );
};

export default Home;
