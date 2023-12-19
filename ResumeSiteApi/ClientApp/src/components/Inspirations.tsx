import React, { Component } from 'react';
import 'bootstrap';
import '../css/About.css';

interface IState {
    APODUrl: Promise<string> | null;
    APODExplanation: string;
    loading: boolean;
}
export class Inspiration extends Component<{}, IState> {
    //quotes and things that inspire me.
    state: IState;
    noImage = false;
    constructor(props: {}) {
        super(props);
        this.state = {
            APODUrl: null,
            APODExplanation: '',
            loading: true
        };
    }
    async populateAPOD(selectedDate: Date | null): Promise<string> {
        this.setState({ loading: true });
        if (!selectedDate) {
            selectedDate = new Date();
        }
        const response = await fetch('api/external?apodDate=' + this.getDateAsString(selectedDate));
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        if (data.url) {
            this.setState({ APODUrl: data.url, APODExplanation: data.explanation, loading: false });
            this.noImage = false;
        }
        else {
            this.noImage = true;
        }
        return data.url;
    }

    isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
    }

    getDateAsString(date: Date) {
        return date.toLocaleDateString('en-CA');
    }
    componentDidMount() {
        this.populateAPOD(new Date())
    }

    render() {
        return (
            <div className="About">
        <div className="container">
          <h1 className="about-header">What drives me</h1>
          <div className="wrapper">
            <p className="text-to-spin"></p>
          </div>
          <div className="float-right">
            <form className="form-inline" noValidate>
              <label className="mr-2">Astrology picture of the day from NASA!</label>
              <input
                id="date"
                type="date"
                className="form-control mr-2"
                defaultValue={this.getDateAsString(new Date())}
                onChange={(e) => this.populateAPOD(e.target.valueAsDate)}
              />
            </form>

            {!this.state.loading ? (
              this.isImage(this.state.APODUrl) ? (
                <div className="overlayContainer">
                  <img className="ApodImage img-fluid" alt="test" src={`${this.state.APODUrl}`} />
                  <div className="middle">
                    <div className="text">{this.state.APODExplanation}</div>
                  </div>
                </div>
              ) : (
                <iframe title="Title For IFrame" className="ApodImage" src={`${this.state.APODUrl}`} />
              )
            ) : (
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        </div>
      </div>
        );
    }
}

export default Inspiration;