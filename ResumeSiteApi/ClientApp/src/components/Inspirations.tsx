import React, { useState, useEffect } from 'react';
import 'bootstrap';
import '../css/About.css';
import ImageSlider from './ImageSlider.tsx';
import Knowledge from '../Knowledge.jpg';
import Outdoors from '../Outdoors.jpg';
import Space from '../Space.jpg';
import Learning from '../Learning.jpg';
import Failure from '../Failure.jpg';

interface IState {
  APODUrl: string;
  APODExplanation: string;
  loading: boolean;
}

const Inspiration: React.FC = () => {
  const [state, setState] = useState<IState>({
    APODUrl: '',
    APODExplanation: '',
    loading: true
  });

  const [noImage, setNoImage] = useState(false);

  const populateAPOD = async (selectedDate: Date | null): Promise<string> => {
    setState({ ...state, loading: true });

    if (!selectedDate) {
      selectedDate = new Date();
    }

    try {
      const response = await fetch(`api/external?apodDate=${getDateAsString(selectedDate)}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      if (data.url) {
        setState({ APODUrl: data.url, APODExplanation: data.explanation, loading: false });
        setNoImage(false);
      } else {
        setNoImage(true);
      }

      return data.url;
    } catch (error) {
      console.error('Error fetching APOD:', error);
      return '';
    }
  };

  const isImage = (url: string): boolean => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  const getDateAsString = (date: Date): string => {
    return date.toLocaleDateString('en-CA');
  };

  useEffect(() => {
    populateAPOD(new Date());
  }, []); // Empty dependency array to mimic componentDidMount

  const images = [Knowledge, Outdoors, Learning, Failure, Space];
  const descriptions = [
    { text: 'Knowledge', color: 'white' },
    { text: 'Outdoors', color: 'white' },
    { text: 'Learning', color: 'white' },
    { text: 'Failure', color: 'black' },
    { text: 'Space', color: 'white' }
  ];

  return (
    <div className="Inspiration">
      <ImageSlider images={images} descriptions={descriptions} />
      <div className="float-right">
        <form className="form-inline" noValidate>
          <label className="mr-2">Astronomy picture of the day from NASA!</label>
          <input
            id="date"
            type="date"
            className="form-control mr-2"
            defaultValue={getDateAsString(new Date())}
            onChange={(e) => populateAPOD(e.target.valueAsDate)}
          />
        </form>

        {!state.loading ? (
          isImage(state.APODUrl) ? (
            <div className="overlayContainer">
              <img className="ApodImage img-fluid" alt="APOD" src={state.APODUrl} />
              <div className="middle">
                <div className="text">{state.APODExplanation}</div>
              </div>
            </div>
          ) : (
            <iframe title="Title For IFrame" className="ApodImage" src={state.APODUrl || ''} />
          )
        ) : (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inspiration;
