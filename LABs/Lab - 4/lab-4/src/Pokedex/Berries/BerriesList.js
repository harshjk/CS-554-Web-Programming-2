/******************************************
 *  Author : Harsh Jagdishbhai Kevadia   
 *  Created On : Mon Oct 16 2017
 *  File : BerriesList.js
 *******************************************/
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

class BerriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      berriesResultList: [],
      next: "",
      previous: "",
      totalBerries: "",
      loading: false,
      page: null
    };
  }

  async getBerryList(page) {
    try {
      this.setState({ loading: true });
      const offset = page * 10;
      let url = `berry/?limt=10&offset=${offset}`;
      if (page === 0) {
        let url = `berry/?limt=10`;
      }

      const response = await axiosInstance.get(url);
      const resultSet = response.data.results;
      const nextURL = response.data.next;//.replace('https://pokeapi.co/api/v2/', '');
      const previousURL = response.data.previous//.replace('https://pokeapi.co/api/v2/', '');
      const count = response.data.count;

      this.setState({ loading: false, berriesResultList: resultSet, next: nextURL, previous: previousURL, totalBerries: count, page });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const page = this.props.match.params.page;
    await this.getBerryList(page);
  }

  async componentWillReceiveProps(nextProps) {
    const pageNumber = nextProps.match.params.page;
    const oldPageNumber = this.props.match.params.page;

    if (pageNumber !== oldPageNumber) {
      await this.getBerryList(pageNumber);
    }
  }

  render() {
    let body = null;
    let previousPageNumber = this.state.page - 1;
    let nextPageNumber = parseInt(this.state.page) + 1;
    if (this.state.loading) {
      body = <div className="row">Loading...</div>;
    } else if (this.state.berriesResultList.length !== 0) {
      const berryDisplays = this.state.berriesResultList.map(berry => {
        return (
          <li>
            <Link to={"/berries/" + berry.url.replace('https://pokeapi.co/api/v2/berry/', '')}>{berry.name}</Link>
          </li>
        );
      });
      body = (<div className="row">
        <ul>
          {berryDisplays}
        </ul>
      </div>);
    } else {
      body = <div className="row">No Berries yet!</div>;
    }
    return (
      <section>
        <div className="row">
          <div className="col-sm-8">
            <h2>Berries</h2>
            <h3>Total Berries: {this.state.totalBerries}</h3>
            <div>
              {body}
            </div>
            <div className="PageNation">
              <Link to={`/berries/page/${previousPageNumber}`}><button className="" disabled={!this.state.previous}>Previous</button></Link>
              <Link to={`/berries/page/${nextPageNumber}`}><button className="" disabled={!this.state.next}>Next</button></Link>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default BerriesList;