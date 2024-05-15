import PropTypes from 'prop-types'
import {useState} from "react";

const ErrorMessage = ({message}) => {

    const [isVisible, setIsVisible] = useState(true);

    // Function to toggle the visibility
    const hideMessage = () => {
        setIsVisible(false);
    };


    return (
        isVisible && (
            <div className="fixed top-0 left-0 flex justify-center w-full z-50">
                <div role="alert" className="alert alert-error absolute top-10 px-4 py-2 inline-block w-auto border border-red-800 rounded-2l"
                     onClick={hideMessage}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         className="stroke-current shrink-0 h-6 w-6 inline-block mr-2"
                         fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{message}</span>
                </div>
            </div>
        )
    )
}

ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired,
}

export default ErrorMessage
