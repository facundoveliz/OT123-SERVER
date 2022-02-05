import React, { useEffect } from 'react'
import swal from 'sweetalert2'
import PropTypes from 'prop-types'

import './Alert.css'

/* props:
show: boolean,
title: string
text: string,
icon: 'error', 'success', 'warrning', 'info', 'question' or empty string ''.
Cancel button (cancelbtn) boolean.
if needed you can send as prop true and a cancel button will be displayed.
onConfirm and onCancel are functions to be executed if user clicks on Accept or Cancel buttons */
const Alert = ({
  show,
  title,
  message,
  icon,
  cancelbtn,
  onConfirm,
  onCancel,
}) => {
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
        timer: '3000',
      })
      .then((result) => {
        if (result.isConfirmed) {
          onConfirm()
        } else if (result.isDismissed) {
          onCancel()
        }
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
}
export default Alert
