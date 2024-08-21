import React from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Image,
  InputGroup,
  FormControl,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { IconBase } from "react-icons";
import { Trash2 } from "react-feather";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SendPushNotification } from "../../models/PushNotificationModel";
import { PushNotificationObj } from "../../classes/PushNotification";
const CreatePushNotification = (props: any) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      channel: "",
      message: "",
    },

    // validationSchema: Yup.object({
    //   username: Yup.string()
    //     .min(2, "Must be at least 2 characters long")
    //     .max(15, "Must be 15 characters or less")
    //     .required("Required"),
    //   email: Yup.string().email("Invalid email address").required("Required"),
    //   password: Yup.string()
    //     .min(6, "Must be at least 6 characters long")
    //     .required("Required"),
    // }),
    onSubmit: async (values) => {
      let pushNotification: PushNotificationObj = {
        body: values.message,
        title: values.title,
        channelId: values.channel,
      };
      console.log(pushNotification);
      SendPushNotification(pushNotification, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          formik.resetForm();
          console.log(result);
        }
      });
    },
  });
  const {
    values,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Create New Push Notification</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        id="title"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Select channel</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="channel"
                        value={formik.values.channel}
                      >
                        <option value={"General-Notifications"}>General</option>
                        <option value={"Client-Notifications"}>Clients</option>
                        <option value={"Driver-Notifications"}>Drivers</option>
                        <option value={"Transporter-Notifications"}>
                          Transporters
                        </option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Push notification message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                        id="message"
                      />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3 w-50">
                      <Form.Label>Image</Form.Label>
                      <div className="d-flex">
                        <Form.Control type="file" />
                        <Trash2 color="red" />
                      </div>
                    </Form.Group>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="d-inline-flex">
                      <Form.Label>Image preview</Form.Label>
                      <Image
                        className="w-50"
                        src="https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport/Resources/Images/Octagon+Icon+Logo.png"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CreatePushNotification;
