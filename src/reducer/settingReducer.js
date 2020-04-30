export default function(state, action) {
  console.log("yaha ayo", action)
    switch (action.type) {      
      case 'change':
        return state= action.payload;
      default:
        throw new Error();
    }
    return state;
  }