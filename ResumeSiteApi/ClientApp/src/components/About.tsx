import React, { Component } from 'react';
import 'bootstrap';
import '../css/About.css';

interface IState {
    APODImgUrl: Promise<string>
}
export class  About extends Component {
    state: IState = {
        APODImgUrl:  this.populateAPOD(new Date())
    }
    async populateAPOD(selectedDate: Date | null) : Promise<string> {
        if(!selectedDate){
            selectedDate = new Date();
        }
            const response = await fetch('api/external?apodDate=' + this.getDateAsString(selectedDate));
            const data = await response.json();
            this.setState({APODImgUrl: data.url})
            return data.url;
    }

    getDateAsString(date: Date){ 
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
                <div className="NasaPOD">
                    <form className="About float-right" noValidate>
                        <label>Astrology picture of the day from NASA!</label>
                        <br></br>
                        <input
                            id="date"
                            type="date"
                            defaultValue={this.getDateAsString(new Date())}
                            onChange= {e => this.populateAPOD(e.target.valueAsDate)}
                        />
                        <br></br>
                    </form>
                    <img className='ApodImage' alt='test' src={`${this.state.APODImgUrl}`} />
                </div>
            </div >
        );
    }
}

export default About;