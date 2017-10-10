/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Thu Oct 05 2017
 *  File : index.js
 *******************************************/
import React, {
    Component
} from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from "react-router-dom";
import InfoPage from "./Home/InfoPage";
import Pokemon from "./Pokemon";
import Berries from "./Berries";
import Machines from "./Machines";

class Pokedex extends Component {
    render() {
        const { match } = this.props;
        const { url } = match;

        return ( 
            <div className="row">
        <div className="col-sm-3">
          <div className="list-group">
            <Link className="list-group-item" to={`${url}`}>
              Back to search
            </Link>
          </div>
        </div>
        <div className="col-sm-8 col-sm-offset-1">
          <Switch>
            <Route path={`${url}/`} component={InfoPage} />
            <Route path={`${url}/pokemon/`} component={Pokemon} />
            <Route path={`${url}/berries/`} component={Berries} />
            <Route path={`${url}/machines/`} component={Machines} />
          </Switch>
        </div>
      </div>
        );
    }
}

export default Pokedex;