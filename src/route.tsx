import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import RocketListContainer from './components/Rocket List/index'
import RocketItemContainer from './components/Rocket Item/index'
import Home from './components/Home/Home'
import LaunchListContainer from './components/Launch List/index'

function RouteConfig() {

  return (
	<div>
        <Router>
         <Navbar />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/rockets" component={RocketListContainer}/>
                <Route exact path="/launches" component={LaunchListContainer}/>
                <Route path="/rockets/:id" component={RocketItemContainer}/>
                <Route path="*" component={()=><h2>404 Not Found</h2>}/>
            </Switch>
        </Router>
	</div>
  );
}

export default RouteConfig;