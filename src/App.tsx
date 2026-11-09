import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout/Layout";
import { Home } from "@/pages/Home";
import { Services } from "@/pages/Services";
import { Gallery } from "@/pages/Gallery";
import { Transformations } from "@/pages/Transformations";
import { Booking } from "@/pages/Booking";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { Profile } from "@/pages/Profile";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/transformations" component={Transformations} />
        <Route path="/booking" component={Booking} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <TooltipProvider>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
