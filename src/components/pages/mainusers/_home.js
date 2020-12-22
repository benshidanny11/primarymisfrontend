import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.name !== this.state.name) {
      this.handler();
    }
  }

  componentWillUnmount() {}

  handleEvent() {}

  handler = () => {
    this.setState();
  };

  render() {
    return (
      <div>
        <main>
          <div className="container-fluid">
            <h1 className="mt-4">Dashboard</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">School over view</li>
            </ol>
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="card bg-primary text-white mb-4">
                  <div className="card-body">2000 students</div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card bg-warning text-white mb-4">
                  <div className="card-body">100 Techers</div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card bg-success text-white mb-4">
                  <div className="card-body">30 classes</div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card bg-info text-white mb-4">
                  <div className="card-body">100 Users</div>
                  <div className="card-footer d-flex align-items-center justify-content-between">
                    <a className="small text-white stretched-link" href="#">
                      View Details
                    </a>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6">
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-chart-area mr-1"></i>
                    Students statits by levels
                  </div>
                  <div className="card-body">
                    <canvas id="myAreaChart" width="100%" height="40"></canvas>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="card mb-4">
                  <div className="card-header">
                    <i className="fas fa-chart-bar mr-1"></i>
                    Students statistics by years
                  </div>
                  <div className="card-body">
                    <canvas id="myBarChart" width="100%" height="40"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
export default Home;
