import { getAllActivities } from '../../services/activitiesService';
import { getAllContacts } from '../../services/contactsService';

export default async function loadListData(path) {
  let data = []
  switch (path) {
    case 'actividades':
      data = await getAllActivities()
      break;
    case 'contactos':
      data = await getAllContacts()
      break;

    default:
      break;
  }
  return data.data.result
}
