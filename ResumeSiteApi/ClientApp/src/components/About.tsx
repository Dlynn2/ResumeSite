import React, { Component } from 'react';
import 'bootstrap';
import '../css/About.css';

interface IState {
    APODUrl: Promise<string>;
    APODExplanation: string;
    loading: boolean;
}
export class About extends Component<IState> {
    state: IState;
    noImage = false;
    constructor() {
        super();

        this.state = {
            APODUrl: this.populateAPOD(new Date()),
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
        const data = await response.json();
        if(data.url){
            this.setState({ APODUrl: data.url, APODExplanation: data.explanation, loading: false });
            this.noImage = false;
        }
        else{
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
    }

    render() {
        return (
            <div className="About">
                <h1 className="about-header">What drives me</h1>
                <div className="wrapper">
                    <p className="text-to-spin"></p>
                </div>
                <div>
                    <form className="About float-right" noValidate>
                        <label>Astrology picture of the day from NASA!</label>
                        <br></br>
                        <input
                            id="date"
                            type="date"
                            defaultValue={this.getDateAsString(new Date())}
                            onChange={e => this.populateAPOD(e.target.valueAsDate)}
                        />
                        <br></br>
                    </form>

                    {
                        !this.state.loading ? this.isImage(this.state.APODUrl) ?
                            <div className="overlayContainer">
                                <img className='ApodImage' alt='test' src={`${this.state.APODUrl}`} />
                                <div class="middle">
                                    <div class="text">{this.state.APODExplanation}</div>
                                </div>
                            </div>
                            :
                            <iframe className='ApodImage' src={`${this.state.APODUrl}`}></iframe>
                            :
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                    }
                </div>
            </div >
        );
    }
}

export default About;