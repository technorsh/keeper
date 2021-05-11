export const SETLOGIN = 'SETLOGIN';
export const SETNOTES = 'SETNOTES';
export const SETUSER = 'SETUSER';

export const setLogin = (data) => {
  return{
    type:SETLOGIN,
    data:data
  }
}
export const setNotes = (data) => {
  return{
    type:SETNOTES,
    data:data
  }
}
export const setUser = (data) => {
  return{
    type:SETUSER,
    data:data
  }
}
