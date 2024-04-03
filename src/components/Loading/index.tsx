import { GridLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: '100vh',
      }}
    >
      <GridLoader color="rgb(17,0,77)" size={30} />
    </div>
  );
};

export default Loading;
