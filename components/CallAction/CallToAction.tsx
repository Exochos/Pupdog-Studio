import { CALL_TO_ACTION_TEXT, PHONE_NUMBER } from '../../Data/constants';

const CallToAction = () => {
  const handleClick = () => {
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'Button',
        event_label: 'Call Button',
        value: PHONE_NUMBER,
      });
    }

    // Initiate call
    window.location.href = `tel:${PHONE_NUMBER}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white text-black text-center py-2 border-t-2 border-black rounded-t-lg md:relative md:bg-transparent md:text-black md:py-4 md:border-none">
      <button
        className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 w-full md:w-auto md:px-8"
        onClick={handleClick}
      >
        {CALL_TO_ACTION_TEXT}
      </button>
    </div>
  );
};

export default CallToAction;
