// import React, { useEffect } from 'react';

// const typeStyles = {
//   info: 'bg-blue-100 text-blue-800 border-blue-400',
//   success: 'bg-green-100 text-green-800 border-green-400',
//   error: 'bg-red-100 text-red-800 border-red-400',
//   warning: 'bg-yellow-100 text-yellow-800 border-yellow-400',
// };

// const Alert = ({ type = 'info', message, onClose, duration = 3000 }) => {
//   useEffect(() => {
//     if (duration > 0) {
//       const timer = setTimeout(onClose, duration);
//       return () => clearTimeout(timer);
//     }
//   }, [duration, onClose]);

//   return (
//     <div
//       className={`flex items-center justify-between border-l-4 p-4 mb-4 rounded shadow-sm ${typeStyles[type]}`}
//       role="alert"
//     >
//       <span>{message}</span>
//       <button
//         className="text-xl font-bold leading-none ml-4 focus:outline-none"
//         onClick={onClose}
//       >
//         ×
//       </button>
//     </div>
//   );
// };

// export default Alert;
