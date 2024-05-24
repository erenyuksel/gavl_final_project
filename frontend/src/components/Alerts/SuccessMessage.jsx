import PropTypes from "prop-types";


const SuccessMessage = ( { message } ) => {
  return (
    <div className="fixed top-0 left-0 flex justify-center w-full z-50">
      <div role="alert" className="alert alert-success absolute top-10 px-4 py-2 inline-block w-auto">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{message}</span>
      </div>
    </div>
  )
}

SuccessMessage.propTypes = {
    message: PropTypes.string.isRequired,
}

export default SuccessMessage