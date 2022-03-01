import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoute from '../hoc/AdminRoute'
import ListActivities from '../pages/backoffice/activities/ListActivities'
import ListNews from '../pages/backoffice/news/ListNews'
import UsersList from '../pages/backoffice/users/UsersList'
import EditProfile from '../pages/profile/EditProfile'
import ActivitiesForm from '../components/activitiesForm/ActivitiesForm'
import NewsForm from '../components/news/NewsForm'
import ListCategories from '../pages/backoffice/categories/ListCategories'
import ContactsList from '../pages/contact/ContactsList'
import TestimonialList from '../pages/backoffice/testimonials/ListTestimonials'
import TestimonialForm from '../components/testimonials/TestimonialForm'
import Backoffice from '../pages/backoffice/Index'
import EditHomePage from '../components/home/EditHomePage'
import EditWelcomeText from '../components/home/editWelcomeText'
import EditSlideForm from '../components/home/EditSlideForm'
import CategoryForm from '../components/categories/CategoriesForm'
import ListUsers from '../pages/backoffice/users/ListUsers'

/* import ListContacts from '../pages/backoffice/ListContacts'
import Users from '../pages/Users'
import EditUserForm from '../components/forms/EditUserForm'
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
      <Route path="novedades">
        <Route index element={<ListNews />} />
        <Route path=":id" element={<NewsForm />} />
        <Route path="nuevo" element={<NewsForm />} />
      </Route>
      <Route path="categorias">
        <Route index element={<ListCategories />} />
        <Route path=":id" element={<CategoryForm />} />
        <Route path="nuevo" element={<CategoryForm />} />
      </Route>
      <Route path="contactos" element={<ContactsList />} />
      <Route path="testimonios">
        <Route index element={<TestimonialList />} />
        <Route path=":id" element={<TestimonialForm />} />
        <Route path="nuevo" element={<TestimonialForm />} />
      </Route>
      <Route path="usuarios">
        <Route index element={<UsersList />} />
        <Route path=":id" element={<EditProfile />} />
      </Route>
      <Route path="home">
        <Route index element={<EditHomePage />} />
        <Route path="editwelcometext" element={<EditWelcomeText />} />
        <Route path="slide/:id" element={<EditSlideForm />} />
      </Route>
      <Route path="usuarios">
        <Route index element={<ListUsers />} />
      </Route>
    </Route>
  </Routes>
)

export default AdminRoutes
