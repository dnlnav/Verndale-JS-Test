export function mapResponseToStateList(responseData){
  return responseData.map( state => state.name );
}