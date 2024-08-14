import React from "react";
import { Row, Col, Card, Table } from "react-bootstrap";

const PushNotifications = () => {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Push Notifications</Card.Title>
              <span className="d-block m-t-5">
                <code>Click</code> to view a notification.
              </span>
            </Card.Header>
            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Channel</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">3</th>
                    <td>2024-01-01 13:00</td>
                    <td>General</td>
                    <td>Taxi Driver Strike 🚕</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>2024-01-01 13:00</td>
                    <td>General</td>
                    <td>Taxi Driver Strike 🚕</td>
                  </tr>
                  <tr>
                    <th scope="row">1</th>
                    <td>2024-01-01 13:00</td>
                    <td>General</td>
                    <td>Taxi Driver Strike 🚕</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PushNotifications;
