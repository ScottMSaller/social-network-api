export default (timestamp) => {
    const dateObj = new Date(timestamp);
    return `${dateObj.toLocaleDateString()} at ${dateObj.toLocaleTimeString()}`;
  };
  