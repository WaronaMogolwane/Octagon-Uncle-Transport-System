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
                      <Form.Control as="textarea" rows="3" />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Image</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group class="text-align-center">
                      <Form.Label>Image preview</Form.Label>
                      <Image
                        src="https://f005.backblazeb2.com/file/Dev-Octagon-Uncle-Transport/Resources/Images/Octagon+Icon+Logo.png"
                        fluid
                      />
                    </Form.Group>
                  </Col>
                  <Button variant="primary">Submit</Button>
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
