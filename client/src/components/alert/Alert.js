import React, { useEffect } from 'react'
import swal from 'sweetalert2'
import PropTypes from 'prop-types'

import './Alert.css'
import { useDispatch } from 'react-redux'
import { resetAlertData } from '../../app/slices/alert'

const Alert = ({
  show,
  title,
  message,
  icon,
  cancelbtn,
  onConfirm,
  onCancel,
  timer,
}) => {
  const dispatch = useDispatch()
  const showAlert = async () =>
    swal
      .fire({

        position: 'center',
        padding: '1rem 2rem',
        confirmButtonColor: 'lightblue',
        cancelButtonColor: 'red',
        title: `${title}`,
        text: `${message}`,
        icon: `${icon}`,
        showCancelButton: cancelbtn,
        allowOutsideClick: !cancelbtn, // If cancel button is displayed, do not allow outside click.
        backdrop: true,
        timer: `${timer}`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          onConfirm()
        } else if (result.isDismissed) {
          onCancel()
        }
        dispatch(resetAlertData())
      })
  useEffect(() => {
    if (show) {
      const result = showAlert()
      if (result.isConfirmed) {
        onConfirm()
      }
      if (result.isDismissed) {
        onCancel()
      }
    } // eslint-disable-next-line
  }, [show, onConfirm, onCancel])
  return <div />
}

Alert.defaultProps = {
  icon: '',
  cancelbtn: false,
  timer: '3000',
  onCancel: () => {},
}

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  icon: PropTypes.string,
  cancelbtn: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  timer: PropTypes.string,
}
export default Alert
