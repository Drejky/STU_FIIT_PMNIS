import { Rating, Typography } from '@mui/material';
import { useState } from 'react';
import styles from '../grafikon/index.module.css';
import newStyles from './index.module.css';
import CustomButton from '@/components/CustomButton';

const hodnoteniePage = () => {
  const [usability, setUsability] = useState('');
  const [accuracy, setAccuracy] = useState('');
  const [comments, setComments] = useState('');
  const [ratings, setRatings] = useState<number[]>([]);

  const [done, setDone] = useState(false);
  return (
    <div>
      <h1 className={styles.rating}>Feedback Form</h1>
      <div className={newStyles.form}>
        <div className={styles.rating}>
          <Typography>Ako spokojný ste s presnosťou klasifikácie?</Typography>
          <Rating
            name="simple-controlled"
            value={ratings[0]}
            onChange={(event, newValue) => {
              if (typeof newValue === 'number') {
                setRatings(
                  ratings.map((item, index) => (index === 0 ? newValue : item))
                );
              }
            }}
          />
        </div>
        <div className={styles.rating}>
          <Typography>
            Potrebovali by ste viac vysvetliť chod aplikácie?
          </Typography>
          <Rating
            name="simple-controlled"
            value={ratings[0]}
            onChange={(event, newValue) => {
              if (typeof newValue === 'number') {
                setRatings(
                  ratings.map((item, index) => (index === 0 ? newValue : item))
                );
              }
            }}
          />
        </div>
        <div className={styles.rating}>
          <Typography>Boli Vám klasifikované dáta užitočné?</Typography>
          <Rating
            name="simple-controlled"
            value={ratings[0]}
            onChange={(event, newValue) => {
              if (typeof newValue === 'number') {
                setRatings(
                  ratings.map((item, index) => (index === 0 ? newValue : item))
                );
              }
            }}
          />
        </div>

        <label className={styles.rating}>
          Any other comments?
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </label>
        <label className={styles.rating}>
          {!done ? (
            <CustomButton onClick={() => setDone(true)}> Submit </CustomButton>
          ) : (
            'Ďakujeme za hodnotenie!'
          )}{' '}
        </label>
      </div>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 1em;
        }
        select,
        textarea {
          margin-top: 0.5em;
        }
        button {
          margin-top: 1em;
        }
      `}</style>
    </div>
  );
};

export default hodnoteniePage;
