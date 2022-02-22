import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoute from '../hoc/AdminRoute'
import ListActivities from '../pages/backoffice/activities/ListActivities'
import ActivitiesForm from '../components/activitiesForm/ActivitiesForm'
import ListCategories from '../pages/backoffice/categories/ListCategories'
import ContactsList from '../pages/contact/ContactsList'
import TestimonialList from '../pages/backoffice/testimonials/ListTestimonials'
import TestimonialForm from '../components/testimonials/TestimonialForm'
import EditHomePage from '../components/home/EditHomePage'
import EditWelcomeText from '../components/home/editWelcomeText'
import EditSlideForm from '../components/home/EditSlideForm'
import Backoffice from '../pages/backoffice/Index'

/*
import Categories from '../pages/Categories'
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
    <Route element={<AdminRoute />}>
      <Route path="" element={<Backoffice />} />
      <Route path="actividades">
        <Route index element={<ListActivities />} />
        <Route path=":id" element={<ActivitiesForm />} />
        <Route path="nuevo" element={<ActivitiesForm />} />
      </Route>
      <Route path="categorias" element={<ListCategories />} />
      <Route path="contactos" element={<ContactsList />} />
      <Route path="testimonios">
        <Route index element={<TestimonialList />} />
        <Route path=":new" element={<TestimonialForm />} />
      </Route>
      <Route path="home">
        <Route index element={<EditHomePage />} />
        <Route path="editwelcometext" element={<EditWelcomeText />} />
        <Route path="editslider/:id" element={<EditSlideForm />} />
      </Route>
    </Route>
  </Routes>
)

export default AdminRoutes
