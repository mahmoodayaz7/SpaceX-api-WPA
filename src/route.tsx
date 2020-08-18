import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from './components/Navbar/Navbar'
import RocketListContainer from './components/Rocket List/index'
import RocketItemContainer from './components/Rocket Item/index'
import Home from './components/Home/index'
import ShipListContainer from './components/Ship List/index'
import ShipItemContainer from './components/Ship Item/index'
import MissionListContainer from './components/Mission List/index'
import MissionItemContainer from './components/Mission Item/index'


function RouteConfig() {

  return (
	<div>
        <Router forceRefresh={true} >
         <Navbar />
         {!window.navigator.onLine && <h2 className = "offline">You are in offline mode. You may not be able to see all the images.</h2>} 
            <Switch>
             
                <Route exact path="/" component={Home}/>
                <Route exact path="/rockets" component={RocketListContainer}/>
                <Route exact path="/ships" component={ShipListContainer}/>
                <Route exact path="/missions" component={MissionListContainer}/>
                <Route path="/rockets/:id" component={RocketItemContainer}/>
                <Route path="/ships/:id" component={ShipItemContainer}/>
                <Route path="/missions/:id" component={MissionItemContainer}/>
                <Route path="*" component={()=><h2>404 Not Found</h2>}/>
                
            </Switch>
        </Router>
	</div>
  );
}

export default RouteConfig;