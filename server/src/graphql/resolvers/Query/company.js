import { getCompany, getUser } from '../../../helpers';

export default async function company(root, { id }, { ctx }, info) {
  console.log({ pqp: info });
  return getCompany(id);
}

// export async function employee(root, { id }, { ctx }, info) {
//   function getUser(id) {
//     return data.filter(function(data) {
//       return data.company == id;
//     });
//   }

//   var found = getUser(id);
//   console.log({ found: found });
//   return found;
// }
