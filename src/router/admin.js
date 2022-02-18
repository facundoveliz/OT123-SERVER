import React from 'react'
import { Route, Routes } from 'react-router-dom'

import AdminRoute from '../hoc/AdminRoute'

import ListActivities from '../pages/backoffice/activities/ListActivities'
import ActivitiesForm from '../components/activitiesForm/ActivitiesForm'

/* import Categories from '../pages/Categories'
import News from '../pages/backoffice/news/ListNews'
 import ListContacts from '../pages/backoffice/ListContacts'
import Users from '../pages/Users'
import EditHomeForm from '../components/forms/home/EditHomeForm'
import EditSlideForm from '../components/forms/home/EditSlideForm'
import EditUserForm from '../components/forms/EditUserForm'
import EditNewsForm from '../components/forms/EditNewsForm'
import EditActivityForm from '../components/forms/EditActivityForm'
import EditCategoryForm from '../components/forms/EditCategoryForm'
import EditTestimonialsForm from '../components/forms/EditTestimonialsForm'
import EditHomePage from '../pages/backoffice/home/EditHomePage'
import ListTestimonials from '../pages/backoffice/ListTestimonials'
*/
const AdminRoutes = () => (
  <Routes>
    <Route path="" element={<AdminRoute />}>
      <Route path="activities">
        <Route index element={<ListActivities />} />
        <Route path=":id" element={<ActivitiesForm />} />
        <Route path="new" element={<ActivitiesForm />} />
      </Route>

    </Route>
  </Routes>
)

export default AdminRoutes
