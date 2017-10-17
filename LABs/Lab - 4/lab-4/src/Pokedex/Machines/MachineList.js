/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Oct 16 2017
 *  File : MachineList.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

class MachineList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      machinesResultList: [],
      next: "",
      previous: "",
      totalMachines: "",
      loading: false,
      page: null
    };
  }

  async getMachinesList(page) {
    try {
      this.setState({ loading: true });
      const offset = page * 10;
      let url = `machine/?limt=10&offset=${offset}`;
      if (page === 0) {
        let url = `machine/?limt=10`;
      }

      const response = await axiosInstance.get(url);
      const resultSet = response.data.results;
      const nextURL = response.data.next;//.replace('https://pokeapi.co/api/v2/', '');
      const previousURL = response.data.previous//.replace('https://pokeapi.co/api/v2/', '');
      const count = response.data.count;

      this.setState({ loading: false, machinesResultList: resultSet, next: nextURL, previous: previousURL, totalMachines: count, page });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const page = this.props.match.params.page;
    await this.getMachinesList(page);
  }

  async componentWillReceiveProps(nextProps) {
    const pageNumber = nextProps.match.params.page;
    const oldPageNumber = this.props.match.params.page;

    if (pageNumber !== oldPageNumber) {
      await this.getMachinesList(pageNumber);
    }
  }

  render() {
    let body = null;
    let previousPageNumber = this.state.page - 1;
    let nextPageNumber = parseInt(this.state.page) + 1;
    if (this.state.loading) {
      body = <div className="row">Loading...</div>;
    } else if (this.state.machinesResultList.length !== 0) {
      const machineDisplays = this.state.machinesResultList.map(machine => {
        return (
          <li>
            <Link to={"/" + machine.url.replace('https://pokeapi.co/api/v2/', '')}>Machine - {machine.url.replace('https://pokeapi.co/api/v2/machine/','')}</Link>
          </li>
        );
      });
      body = (<div className="row">
        <ul>
          {machineDisplays}
        </ul>
      </div>);
    } else {
      body = <div className="row">No Machines yet!</div>;
    }
    return (
      <section>
        <div className="row">
          <div className="col-sm-8">
            <h2>Machines</h2>
            <h3>Total Machines: {this.state.totalMachines}</h3>
            <div>
              {body}
            </div>
            <div className="PageNation">
              <Link to={`/machine/page/${previousPageNumber}`}><button className="" disabled={!this.state.previous}>Previous</button></Link>
              <Link to={`/machine/page/${nextPageNumber}`}><button className="" disabled={!this.state.next}>Next</button></Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default MachineList;