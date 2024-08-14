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
const CreatePushNotification = () => {
  return (
    <React.Fragment>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Create New Push Notification</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" placeholder="Title" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlSelect1"
                    >
                      <Form.Label>Select channel</Form.Label>
                      <Form.Control as="select">
                        <option>General</option>
                        <option>Clients</option>
                        <option>Drivers</option>
                        <option>Transporters</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Label>Push notification message</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3 w-50">
                      <Form.Label>Image</Form.Label>
                      <div className="d-flex">
                        <Form.Control type="file" />
                        <Trash2 color="red" />
                      </div>
                    </Form.Group>
                    <Button variant="primary">Submit</Button>
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
