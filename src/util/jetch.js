
const jetch = async url => {
   const res = await fetch(url);
   const obj = await res.json();
   return obj;
};

export default jetch;