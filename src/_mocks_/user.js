import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------

const rcList = async() => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch(process.env.REACT_APP_BACKEND_API + '/getRcList', requestOptions);
  const data = await response.json();
  return data.info;
}

const users = [...Array(24)].map((_, index) => ({
  id : 1,
  studentName : 'Sandeep',
  fatherName : mockImgAvatar(index + 1),
  trainingStartDate: faker.name.findName(),
  trainingEndDate: faker.company.companyName(),
  status: sample(['active', 'expired']),
}));

export default users;